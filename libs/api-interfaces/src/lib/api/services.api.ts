import { HttpMethod } from '../consts/HttpMethod.const';

const { POST } = HttpMethod;

// Public API
export const services = {
  ['upload']: {
    method: POST,
    path: '/datafiles/upload',
  },
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
