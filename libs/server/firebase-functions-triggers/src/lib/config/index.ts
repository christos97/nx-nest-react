import { config } from 'firebase-functions';

const { validation_service_url, render_service_url } = config().services;

console.log({ validation_service_url, render_service_url });

export const GCLOUD_PROJECT = 'lesi-charts';
export const GCLOUD_REGION = 'europe-central2';
export const VALIDATION_SERVICE_URL = validation_service_url;
export const RENDER_SERVICE_URL = render_service_url;
