import { Injectable } from '@nestjs/common';
import {
  firestore,
  type UpdateData,
  type DocumentReference,
} from '@ntua-saas-10/server-firebase-admin';
import type { Types } from '@ntua-saas-10/shared-types';
import type { ChartConfiguration } from 'chart.js';
import type { ChartType } from '@ntua-saas-10/shared-consts';
import { Quota } from '@ntua-saas-10/shared-consts';

@Injectable()
export class TransactionService {
  async removeCreditsAndSaveChartConfig(
    uid: string,
    chartId: string,
    chartType: ChartType,
    createdAt: Date,
    chartConfig: ChartConfiguration,
  ) {
    const userRef = firestore.collection('users').doc(uid) as DocumentReference<Types.User>;
    const chartRef = userRef.collection('charts').doc(chartId) as DocumentReference<Types.Chart>;

    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const user = userDoc.data() as Types.User;
      const creditsToRemove = Quota.creditsPerChart;

      if (user.customClaims.quota.current >= creditsToRemove) {
        const updatedQuota = user.customClaims.quota.current - creditsToRemove;
        const updatedUser: UpdateData<Types.User> = {
          'customClaims.quota.current': updatedQuota,
        };

        transaction.update(userRef, updatedUser);
        transaction.set(chartRef, {
          chartType,
          createdAt,
          chartConfig,
        });
      } else {
        throw new Error('Not enough credits');
      }
    });
  }
}
