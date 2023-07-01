import { firestoreFunctions, logger } from '../../_';
import { call } from '../../utils/call.util';
import type { CloudFunction, EventContext } from 'firebase-functions';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { RENDER_SERVICE_URL } from '../../config';

export const documentCreatedTrigger: CloudFunction<QueryDocumentSnapshot> = firestoreFunctions
  .document(`users/{uid}/charts/{chartId}`)
  .onCreate(async (snapshot: QueryDocumentSnapshot, context: EventContext) => {
    const { uid, chartId } = context.params;

    logger.info('Document created', { uid, chartId, RENDER_SERVICE_URL });

    return await call(RENDER_SERVICE_URL, { uid, chartId });
  });
