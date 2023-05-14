import { env } from '@ntua-saas-10/web/env';

export const BASE_URL = env.VITE_PUBLIC_API || 'bad_base_url';
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
