import { ContentType } from '@ntua-saas-10/shared-consts';
import type { AxiosRequestHeaders } from 'axios';

export const replaceRouteIdParams = (url: string, ids: Array<string | number>): string => {
  ids.forEach((id) => (url = url.replace(/{{id}}/, String(id))));
  return url;
};

export const appendQueryParams = (url: string, params: Record<string, string | number>): string => {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlParams.append(key, String(value));
  }
  return `${url}?${urlParams.toString()}`;
};

export const appendHeaders = (headers?: AxiosRequestHeaders) => {
  const DEFAULT_HEADERS = {
    'Content-Type': ContentType.application_json,
    Accept: ContentType.application_json,
  } as const;

  if (Object.keys(headers || {}).length === 0) {
    return DEFAULT_HEADERS;
  }
  return { ...DEFAULT_HEADERS, ...headers };
};

export const isUrl = (url?: string) => !!url && /^https?:\/\/.+$/.test(url);

export const invalidUrls = (...args: string[]) => args.some((url) => !isUrl(url));

export const addLeadingSlash = (url: string): string => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return url;
};
