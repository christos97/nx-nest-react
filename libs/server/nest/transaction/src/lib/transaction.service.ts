import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import { Quota } from '@ntua-saas-10/shared-consts';
import type { User, Chart } from '@ntua-saas-10/shared-types';
import type { DocumentReference } from 'firebase-admin/firestore';

@Injectable()
export class TransactionService {
  private readonly CHARTS_COLLECTION_PATH: string;

  constructor(private configService: ConfigService) {
    this.CHARTS_COLLECTION_PATH = this.configService.getOrThrow('CHARTS_COLLECTION_PATH');
  }

  async removeCreditsAndClaimChart(uid: string, chartId: string) {
    const userRef = firestore.collection('users').doc(uid) as DocumentReference<User>;
    const chartRef = userRef.collection('charts').doc(chartId) as DocumentReference<Chart>;

    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const user = userDoc.data();
      if (!(user && chartRef)) {
        throw new NotFoundException(`User ${uid} not found with chart ${chartId}`);
      }
      const updatedQuota = (user.customClaims.quota?.current || -1) - Quota.creditsPerChart;
      if (updatedQuota >= 0) {
        transaction.update<User>(userRef, {
          'customClaims.quota.current': updatedQuota,
        });
        transaction.update<Chart>(chartRef, {
          claimed: true,
        });
      } else {
        throw new ForbiddenException('Not enough credits');
      }
    });
  }
}
