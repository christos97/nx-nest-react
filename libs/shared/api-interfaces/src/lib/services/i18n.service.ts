import { env } from '@ntua-saas-10/web/env';

const I18nService = {
  baseUrl: env.VITE_PUBLIC_I18N_SERVICE_URL,
  paths: {
    i18n: 'i18n',
  },
} as const;

export default I18nService;
export type I18nService = typeof I18nService;
