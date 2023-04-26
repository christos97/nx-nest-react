import { env } from '@ntua-saas-10/web/env';

const SERVICES = {
  I18nService: {
    baseUrl: env.VITE_PUBLIC_I18N_SERVICE_URL,
    paths: {
      i18n: 'i18n',
    },
  },
  AnotherService: {
    baseUrl: 'http://localhost:9999/api',
    paths: {
      hello: 'hello',
    },
  },
} as const;

type ServicesLookup = typeof SERVICES;

export const { I18nService, AnotherService }: ServicesLookup = SERVICES;
export default SERVICES;
