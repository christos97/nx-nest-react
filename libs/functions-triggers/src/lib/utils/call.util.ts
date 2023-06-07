import axios, { type AxiosResponse, type AxiosRequestHeaders } from 'axios';
import { HttpsError, HttpsInternal, logger } from '../_';
import { isUrl } from './isUrl.util';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpMethod } from '@ntua-saas-10/shared-consts';

/**
 * Calls a URL with optional data and method
 *
 * Defaults to `GET` if no `method` is provided
 *
 * @param url The URL to call
 *
 * Passing `data` without a `method` will default to `POST`
 * @param data The data to send as JSON in the body - if provided, defaults to `POST`
 * @default undefined
 *
 * @param method The HTTP methods that can be used
 * @default `GET`
 *
 * @returns The response data as `T` (generic)
 */
export const call = async <T = unknown>(
  url: string,
  data?: T,
  method: HttpMethod = HttpMethod.GET,
  headers?: AxiosRequestHeaders,
): Promise<T> => {
  if (!isUrl(url)) throw new HttpsError('invalid-argument', 'Invalid url passed to call', { url });

  if (data && method === HttpMethod.DELETE) {
    throw new HttpsError('invalid-argument', 'HTTP DELETE does not support a request body', {
      method,
    });
  }

  const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-FUNCTION-TRIGGER': 'true',
  };

  const options: AxiosRequestConfig = {
    method,
    data,
    headers: headers
      ? {
          ...DEFAULT_HEADERS,
          ...headers,
        }
      : DEFAULT_HEADERS,
  };

  if (data && method === HttpMethod.GET) options.method = HttpMethod.POST;

  try {
    const response: AxiosResponse<T> = await axios(url, options);
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    const errObj = {
      url,
      method,
      message: e.message,
      response: e.response?.data,
    };
    logger.error('AXIOS_CALL_UTIL', { errObj });
    throw HttpsInternal;
  }
};
