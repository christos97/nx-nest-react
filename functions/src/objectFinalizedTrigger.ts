import * as functions from 'firebase-functions';
import { call } from './utils';

// function onfinalize trigger for storage bucket
export const objectFinalizedTrigger = functions
  .region('europe-central2')
  .storage.object()
  .onFinalize(async (object, context) => {
    const { metadata } = object || {};
    if (!metadata) throw new Error('No objectFinalizedPushEndpoint provided');
    functions.logger.log(context.resource.name, { object, context });
    const url = metadata['objectFinalizedPushEndpoint'];
    return url ? await call(url, { object, context }) : 'No objectFinalizedPushEndpoint provided';
  });
