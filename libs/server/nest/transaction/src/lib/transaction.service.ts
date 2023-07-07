import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import { CollectionsPaths, Quota } from '@ntua-saas-10/shared-consts';
import type { User, Chart } from '@ntua-saas-10/shared-types';
import type { DocumentReference } from 'firebase-admin/firestore';

@Injectable()
export class TransactionService {
  private readonly USERS_COLLECTION_PATH = CollectionsPaths.USERS_COLLECTION_PATH;
  private readonly CHARTS_COLLECTION_PATH = CollectionsPaths.CHARTS_COLLECTION_PATH;
  private readonly logger = new Logger(TransactionService.name);

  async removeCreditsAndClaimChart(uid: string, chartId: string) {
    const userRef = firestore.doc(
      `${this.USERS_COLLECTION_PATH}/${uid}`,
    ) as DocumentReference<User>;

    const chartRef = firestore.doc(
      `${this.CHARTS_COLLECTION_PATH.replace('{uid}', uid)}/${chartId}`,
    ) as DocumentReference<Chart>;

    await firestore.runTransaction(async (transaction) => {
      this.logger.log(`Removing credits and claiming chart ${chartId} for user ${uid}`);
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

        this.logger.log(`User ${uid} has ${updatedQuota} credits left`);
      } else {
        throw new ForbiddenException('Not enough credits');
      }
    });
  }
}
