import { ServicePaths } from './constants';

export const Services = {
  I18n: ServicePaths.I18nService,
} as const;

export type Services = typeof Services;

export default Services;
