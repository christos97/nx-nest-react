import { firestoreFunctions, logger } from '../../_';
import { call } from '../../utils/call.util';
import type { CloudFunction, EventContext, Change } from 'firebase-functions';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { RENDER_SERVICE_URL } from '../../config';

export const documentUpdatedTrigger: CloudFunction<Change<QueryDocumentSnapshot>> =
  firestoreFunctions
    .document(`users/{uid}/charts/{chartId}`)
    .onUpdate(
      async (
        change: Change<QueryDocumentSnapshot>,
        context: EventContext<{ uid: string; chartId: string }>,
      ) => {
        const { uid, chartId } = context.params;

        logger.info('Document updated', { uid, chartId, RENDER_SERVICE_URL });

        return await call(RENDER_SERVICE_URL, { uid, chartId });
      },
    );
