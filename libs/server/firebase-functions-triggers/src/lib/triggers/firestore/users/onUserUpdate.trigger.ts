import { User, UserCustomClaims } from '@ntua-saas-10/shared-types';

import { firestoreFunc, logger, auth, HttpsOK, api } from '../../../_';

export const userUpdatedTrigger = firestoreFunc
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    const uid = context.params.uid;
    const user = change.after.data() as User; // Assuming user data is being updated
    logger.log('User Firestore Doc Created', { change, context });

    try {
      const res = await api.users.update(uid, user);
      logger.log('User Firestore Doc Created', { res });
    } catch (error) {
      logger.error('User Firestore Doc Created', { error });
    }
    const currentQuota = user.customClaims?.quota?.current;
    if (currentQuota && currentQuota >= 0) {
      const userRec = await auth.getUser(uid);
      const prevClaims = (userRec.customClaims as UserCustomClaims) || {};
      const customClaims: UserCustomClaims = {
        ...prevClaims,
        quota: {
          ...(prevClaims?.quota || {}),
          current: currentQuota,
        },
      };
      return await Promise.all([
        api.users.update(uid, { customClaims }),
        auth.setCustomUserClaims(uid, customClaims),
      ]).finally(() => HttpsOK);
    }
    return HttpsOK;
  });
