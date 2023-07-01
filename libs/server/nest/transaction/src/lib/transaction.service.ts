import { BadRequestException, Injectable } from '@nestjs/common';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import type { Types } from '@ntua-saas-10/shared-types';
import { Quota } from '@ntua-saas-10/shared-consts';
import type { UpdateData, DocumentReference } from 'firebase-admin/firestore';

@Injectable()
export class TransactionService {
  async removeCredits(uid: string) {
    const userRef = firestore.collection('users').doc(uid) as DocumentReference<Types.User>;

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
      } else {
        throw new BadRequestException('Not enough credits');
      }
    });
  }
}
