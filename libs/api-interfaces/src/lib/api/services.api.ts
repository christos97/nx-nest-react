import { HttpMethods } from '../types';

// Public API
export const services = {
  [HttpMethods.POST]: ['uploader'],
} as const;

// TODO move to services lookup
export const I18nService = {
  baseUrl: 'http://localhost:1188/api',
  paths: {
    i18n: 'i18n',
  },
} as const;

export type ServicesLookup = typeof services;
export default services;
