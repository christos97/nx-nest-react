import I18nService from './i18n.service';

export const Services = {
  I18n: I18nService,
} as const;

export type Services = typeof Services;

export default Services;
