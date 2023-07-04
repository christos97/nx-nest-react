const I18nService = 'I18nService';

export const ServicePaths = {
  [I18nService]: {
    paths: {
      i18n: 'i18n',
    },
  },
} as const;

export type ServicePaths = (typeof ServicePaths)[keyof typeof ServicePaths];
