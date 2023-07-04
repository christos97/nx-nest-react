import { ApiSDK } from '@ntua-saas-10/shared-api-sdk';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

import { GCLOUD_REGION } from './config';

const regionBuilder = functions.region(GCLOUD_REGION);
export const authFunc = regionBuilder.auth;
export const firestoreFunc = regionBuilder.firestore;
export const storageFunc = regionBuilder.storage;
export const logger = functions.logger;

export const FunctionError = functions.https.HttpsError;
export const HttpsOK = new FunctionError('ok', 'ok', null);
export const HttpsInternal = new FunctionError('internal', 'internal', null);

export const auth = getAuth();
export const firestore = getFirestore();
firestore.settings({
  ignoreUndefinedProperties: true,
});

export const api = new ApiSDK({
  apiKey: process.env['SDK_API_KEY'] || '',
});
