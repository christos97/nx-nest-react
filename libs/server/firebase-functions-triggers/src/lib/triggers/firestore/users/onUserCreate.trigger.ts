import { UserRole } from '@ntua-saas-10/shared-consts';
import type { UserCustomClaims } from '@ntua-saas-10/shared-schemas';

import { firestoreFunc, auth, logger } from '../../../_';
import { GCLOUD_PROJECT } from '../../../config';

const INITIAL_QUOTA = 100;

export const userCreatedTrigger = firestoreFunc
  .document('users/{uid}')
  .onCreate(async (_, context) => {
    logger.log('User Firestore Doc Created - Setting Claims', { context });
    const customClaims: UserCustomClaims = {
      disabled: false,
      roles: [UserRole.user],
      quota: {
        current: INITIAL_QUOTA,
        max: INITIAL_QUOTA,
        isProMember: false,
      },
      attributes: {
        projectId: GCLOUD_PROJECT,
      },
    };
    return await auth.setCustomUserClaims(context.params.uid, customClaims);
  });
