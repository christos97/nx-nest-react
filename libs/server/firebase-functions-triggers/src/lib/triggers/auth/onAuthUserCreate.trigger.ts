import { HttpsInternal, HttpsOK, auth, firestore, logger } from '../../_';
import { UserRole } from '@ntua-saas-10/shared-consts';
import { GCLOUD_PROJECT } from '../../config';

import type { CloudFunction, EventContext } from 'firebase-functions';
import type { UserRecord, UserInfo } from 'firebase-admin/auth';
import type { Types } from '@ntua-saas-10/shared-types';

const INITIAL_QUOTA = 100;

/**
 * @description This function is triggered when a `user` is created in firebase auth.
 * @see https://firebase.google.com/docs/functions/auth-events?authuser=0#create_a_user
 *
 * Event: `google.firebase.auth.user.create`
 *
 * - Adds the Firebase Auth user to firestore collection `users` with the same `uid`
 */
export const authUserCreatedTrigger: CloudFunction<UserRecord> = auth
  .user()
  .onCreate(async (userRec: UserRecord, { eventType }: EventContext) => {
    const { uid, email, displayName, photoURL, providerData, disabled, emailVerified, metadata } =
      userRec;

    const providerId = (providerData || []).map((userInfo: UserInfo) => userInfo.providerId)[0];

    if (!email) {
      logger.error(eventType, 'Only users with email are added to firestore');
      throw HttpsInternal;
    }

    const user: Types.User = {
      uid,
      email,
      displayName,
      photoURL,
      providerId,
      disabled,
      emailVerified,
      createdAt: new Date(metadata.creationTime),
      customClaims: {
        roles: [UserRole.user],
        quota: {
          current: INITIAL_QUOTA,
          max: INITIAL_QUOTA,
          isProMember: false,
        },
        attributes: {
          projectId: GCLOUD_PROJECT,
        },
      },
    };

    try {
      await firestore.collection('users').doc(uid).set(user);
      logger.log(eventType, { user });
      return HttpsOK;
    } catch (error) {
      logger.error(eventType, { error });
      throw HttpsInternal;
    }
  });
