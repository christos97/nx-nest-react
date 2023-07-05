import type { ObjectMetadata } from 'firebase-functions/v1/storage';

import { logger } from '../_';
import { VALIDATION_SERVICE_URL } from '../config';

export const NO_NEXT_STEP = 'NO_NEXT_STEP';

export const NEXT_STEP_STORAGE_SERVICES = {
  NO_NEXT_STEP,
  validate: VALIDATION_SERVICE_URL,
} as const;

export type NextStep = keyof typeof NEXT_STEP_STORAGE_SERVICES;

export const getNextStep = ({ metadata, name }: ObjectMetadata): NextStep => {
  const nextStep =
    metadata && metadata['nextStep'] ? (metadata['nextStep'] as NextStep) : NO_NEXT_STEP;
  if (nextStep === NO_NEXT_STEP) {
    logger.log(
      NO_NEXT_STEP,
      `${NO_NEXT_STEP} provided in metadata for object: ${name} - killing trigger...`,
    );
    return NO_NEXT_STEP;
  }
  return nextStep;
};
