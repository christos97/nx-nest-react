import { BadRequestException, Injectable } from '@nestjs/common';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import type { Types } from '@ntua-saas-10/shared-types';
import { Quota } from '@ntua-saas-10/shared-consts';
import type { UpdateData, DocumentReference } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  private readonly CHARTS_COLLECTION_PATH: string;

  constructor(private configService: ConfigService) {
    this.CHARTS_COLLECTION_PATH = this.configService.getOrThrow('CHARTS_COLLECTION_PATH');
  }

  async removeCreditsAndClaimChart(uid: string, chartId: string) {
    const userRef = firestore.collection('users').doc(uid) as DocumentReference<Types.User>;
    const chartRef = firestore
      .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
      .doc(chartId) as DocumentReference<Types.Chart>;

    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const user = userDoc.data() as Types.User;
      const creditsToRemove = Quota.creditsPerChart;

      if (user.customClaims.quota.current >= creditsToRemove) {
        const updatedQuota = user.customClaims.quota.current - creditsToRemove;
        const updatedUser: UpdateData<Types.User> = {
          'customClaims.quota.current': updatedQuota,
        };
        const updatedChart: UpdateData<Types.Chart> = {
          claimed: true,
        };

        transaction.update(userRef, updatedUser);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transaction.update(chartRef, updatedChart);
      } else {
        throw new BadRequestException('Not enough credits');
      }
    });
  }
}
