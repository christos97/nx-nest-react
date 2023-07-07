import { Quota, UserRole } from '@ntua-saas-10/shared-consts';

import type { User } from '@ntua-saas-10/shared-types';
import type { UserRecord, UserInfo } from 'firebase-admin/auth';
import type { CloudFunction, EventContext } from 'firebase-functions';

import { HttpsInternal, HttpsOK, api, authFunc, firestore, logger } from '../../_';
import { GCLOUD_PROJECT } from '../../config';

/**
 * @description This function is triggered when a `UserRecord` is created in firebase auth.
 * @event `google.firebase.auth.user.create`
 * @see https://firebase.google.com/docs/functions/auth-events?authuser=0#create_a_user
 * - Adds a `User` doc to firestore collection `users`
 * @example `users/${uid}`
 */
export const authUserCreatedTrigger: CloudFunction<UserRecord> = authFunc
  .user()
  .onCreate(async (userRec: UserRecord, { eventType }: EventContext) => {
    const { uid, email, displayName, photoURL, providerData, disabled, emailVerified, metadata } =
      userRec;

    const providerId = providerData.map(({ providerId }: UserInfo) => providerId)[0];

    if (!email) {
      logger.error(eventType, 'Only users with email are added to firestore');
      return HttpsOK;
    }

    const user: User = {
      uid,
      email,
      displayName,
      photoURL,
      providerId,
      disabled: !!disabled,
      emailVerified,
      createdAt: new Date(metadata.creationTime),
      customClaims: {
        disabled: !!disabled,
        roles: [UserRole.user],
        quota: {
          current: Quota.initialCredits,
          max: Quota.initialCredits,
          isProMember: false,
        },
        attributes: {
          projectId: GCLOUD_PROJECT,
        },
      },
    };

    try {
      await firestore.collection('users').doc(uid).set(user);
      logger.log('User doc added to firestore', { eventType });
    } catch (error) {
      logger.error('Failed to add doc to firestore', { eventType, error });
    }

    try {
      await api.users.create(user);
      logger.log('User doc added to users service', { eventType });
      return HttpsOK;
    } catch (error) {
      logger.error('Failed to add doc to users servoce', { eventType, error });
      throw HttpsInternal;
    }
  });
