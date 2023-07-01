import * as _functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { GCLOUD_REGION } from './config';

const regionBuilder = _functions.region(GCLOUD_REGION);

export const functions = _functions;
export const storage = regionBuilder.storage;
export const auth = regionBuilder.auth;
export const firestoreFunctions = regionBuilder.firestore;
export const logger = _functions.logger;

export const HttpsError = _functions.https.HttpsError;
export const HttpsOK = new HttpsError('ok', 'ok', null);
export const HttpsInternal = new HttpsError('internal', 'internal', null);

const firestore = getFirestore();
firestore.settings({
  ignoreUndefinedProperties: true,
});
export { firestore };
