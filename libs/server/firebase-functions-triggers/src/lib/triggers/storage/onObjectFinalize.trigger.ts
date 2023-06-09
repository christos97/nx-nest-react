import { HttpsOK, logger, storage } from '../../_';
import { call } from '../../utils/call.util';
import type { ObjectMetadata } from 'firebase-functions/v1/storage';
import type { CloudFunction, EventContext } from 'firebase-functions';
import {
  getNextStep,
  NO_NEXT_STEP,
  NEXT_STEP_STORAGE_SERVICES,
} from '../../utils/getNextStep.util';

/**
 * @description This function is triggered when a file is uploaded to `gs://{projectId}.appspot.com`
 *
 * Event: `google.storage.object.finalize`
 * @see https://firebase.google.com/docs/functions/gcp-storage-events?gen=2nd#trigger-function-on-storage-changes
 *
 * - You must provide a `nextStep` in the file `metadata` for this trigger to continue
 * @example { nextStep: 'validate' }
 */
export const objectFinalizedTrigger: CloudFunction<ObjectMetadata> = storage
  .object()
  .onFinalize(async (object: ObjectMetadata, context: EventContext) => {
    logger.log(context.eventType, {
      name: object.name,
      resource: context.resource,
      metadata: object.metadata || { metadata: 'NO_METADATA_PROVIDED' },
    });
    const nextStep = getNextStep(object);
    if (nextStep === NO_NEXT_STEP) return HttpsOK;
    const url = NEXT_STEP_STORAGE_SERVICES[nextStep];
    return await call(url, { object, context });
  });
