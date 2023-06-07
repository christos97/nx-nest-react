import { HttpsOK, logger, storage } from '../../_';
import { call } from '../../utils/call.util';
import { VALIDATION_SERVICE_URL } from '../../config';
import type { ObjectMetadata } from 'firebase-functions/v1/storage';
import type { EventContext } from 'firebase-functions';

const NO_NEXT_STEP = 'NO_NEXT_STEP';

const SERVICES = {
  NO_NEXT_STEP,
  validate: VALIDATION_SERVICE_URL,
} as const;

type NextStep = keyof typeof SERVICES;

const getNextStep = (metadata: ObjectMetadata['metadata']): NextStep => {
  const nextStep =
    metadata && metadata['nextStep'] ? (metadata['nextStep'] as NextStep) : NO_NEXT_STEP;
  return nextStep;
};

/**
 * @description This function is triggered when a file is uploaded to the storage bucket.
 */
export const objectFinalizedTrigger = storage
  .object()
  .onFinalize(async (object: ObjectMetadata, context: EventContext) => {
    logger.log('onObjectFinalize', { object, context });
    const nextStep = getNextStep(object.metadata);
    if (nextStep === NO_NEXT_STEP) return HttpsOK;
    return await call(SERVICES[nextStep], { object, context });
  });
