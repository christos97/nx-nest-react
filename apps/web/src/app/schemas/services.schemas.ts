import { env } from '@ntua-saas-10/web/env';
import { ServicesSchemas as services } from '@ntua-saas-10/api-interfaces';

export const ServicesSchemas = {
  I18nService: {
    baseUrl: env.VITE_PUBLIC_I18N_SERVICE_URL,
    paths: {
      i18n: 'i18n',
    },
  },
};
