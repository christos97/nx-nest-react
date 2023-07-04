import { call } from '@ntua-saas-10/shared-call';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import type { CloudFunction, EventContext, Change } from 'firebase-functions';

import { firestoreFunc, logger } from '../../_';
import { RENDER_SERVICE_URL } from '../../config';

export const documentUpdatedTrigger: CloudFunction<Change<QueryDocumentSnapshot>> = firestoreFunc
  .document(`users/{uid}/charts/{chartId}`)
  .onUpdate(
    async (
      change: Change<QueryDocumentSnapshot>,
      context: EventContext<{ uid: string; chartId: string }>,
    ) => {
      const { uid, chartId } = context.params;

      logger.info('Document updated', { uid, chartId, RENDER_SERVICE_URL });
      return await call({
        method: 'POST',
        url: RENDER_SERVICE_URL,
        data: { uid, chartId },
      });
    },
  );
