import { Consts } from '@ntua-saas-10/api-interfaces';
import { env } from '@ntua-saas-10/web/env';

const { application_json } = Consts.ContentType;
export const BASE_URL = env.VITE_PUBLIC_API || 'VITE_PUBLIC_API_UNDEFINED';
export const DEFAULT_HEADERS = {
  'Content-Type': application_json,
  Accept: application_json,
};
