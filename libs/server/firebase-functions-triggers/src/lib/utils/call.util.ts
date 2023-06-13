import axios, {
  type AxiosResponse,
  type AxiosRequestHeaders,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios';
import { HttpsError, HttpsInternal, logger } from '../_';
import { isUrl } from './isUrl.util';
import { HttpMethod, ContentType } from '@ntua-saas-10/shared-consts';

/**
 * - Calls `url` with optional data and method
 *
 * - Defaults to `GET` if no `method` is provided
 *
 * - Passing `data` without a `method` will default to `POST`
 *
 * @param url The url to call
 *
 * @param data The data to send as JSON in the request body
 * @default undefined
 *
 * @param method The `HttpMethod` to be used
 * @default `GET`
 *
 * @returns The response data as `T` (generic)
 */
export const call = async <T = unknown>(
  url: string,
  data?: T,
  method: HttpMethod = HttpMethod.POST,
  headers?: AxiosRequestHeaders,
): Promise<T> => {
  if (!isUrl(url)) {
    logger.error('Invalid url passed to call', { url });
    throw new HttpsError('invalid-argument', 'Invalid url passed to call', { url });
  }

  if (data && method === HttpMethod.DELETE) {
    throw new HttpsError('invalid-argument', 'HTTP DELETE does not support a request body');
  }

  const DEFAULT_HEADERS = {
    'Content-Type': ContentType.application_json,
    Accept: ContentType.application_json,
    'X-FUNCTION-TRIGGER': 'true',
  } as const;

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
      method: options.method,
      message: e.message,
      response: e.response?.data,
    };
    logger.error('AXIOS_CALL_UTIL', { errObj });
    throw HttpsInternal;
  }
};
