import { ContentType } from '@ntua-saas-10/shared-consts';
import { env } from '@ntua-saas-10/web/env';

const { application_json } = ContentType;
export const BASE_URL = env.VITE_PUBLIC_API || 'VITE_PUBLIC_API_UNDEFINED';
export const DEFAULT_HEADERS = {
  'Content-Type': application_json,
  Accept: application_json,
  'x-project-id':
    env.VITE_PUBLIC_FIREBASE_CONFIG.projectId || 'VITE_PUBLIC_FIREBASE_CONFIG.projectId_UNDEFINED',
};
