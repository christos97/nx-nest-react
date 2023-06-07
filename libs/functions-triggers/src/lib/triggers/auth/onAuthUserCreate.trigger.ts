import type { UserRecord, UserInfo } from 'firebase-admin/auth';
import { HttpsError, HttpsInternal, HttpsOK, auth, firestore, logger } from '../../_';
import type { Types } from '@ntua-saas-10/shared-types';
import { UserRole } from '@ntua-saas-10/shared-consts';
import { GCLOUD_PROJECT } from '../../config';

const USER_CREATED = 'Firebase Auth User added to firestore';

/**
 * @description This function is triggered when a user is created in firebase auth.
 */
export const authUserCreatedTrigger = auth.user().onCreate(async (userRec: UserRecord) => {
  const { uid, email, displayName, photoURL, providerData, disabled, emailVerified, metadata } =
    userRec;

  const providerId = (providerData || []).map((userInfo: UserInfo) => userInfo.providerId)[0];

  if (!email) throw new HttpsError('invalid-argument', 'email is required');

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
        current: 100,
        max: 100,
        isProMember: false,
      },
      attributes: {
        projectId: GCLOUD_PROJECT,
      },
    },
  };

  try {
    await firestore.collection('users').doc(uid).set(user);
    logger.log(USER_CREATED, { user });
    return HttpsOK;
  } catch (error) {
    logger.error('onAuthUserCreate', error);
    throw HttpsInternal;
  }
});
