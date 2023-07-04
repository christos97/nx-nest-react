import { HttpMethod } from '@ntua-saas-10/shared-consts';
import axios, { type AxiosRequestHeaders, type AxiosError, type AxiosRequestConfig } from 'axios';

import { appendQueryParams, appendHeaders } from './utils';

interface CallOptions<T = unknown> {
  url: string;
  data?: T;
  method?: HttpMethod;
  headers?: AxiosRequestHeaders;
  baseUrl?: string;
  timeout?: number;
}

export const call = async <T = unknown>({
  url,
  data,
  method = HttpMethod.POST,
  headers,
  baseUrl,
  timeout = Number(process.env['API_CALL_TIMEOUT']) || 10000,
}: CallOptions<T>): Promise<T> => {
  axios.defaults.headers.common['X-SDK-API-KEY'] = process.env['SDK_API_KEY'];
  if (process.env['SDK_SANDOX_MODE']) {
    axios.defaults.headers.common['X-SDK-SANDBOX-MODE'] = process.env['SDK_SANDOX_MODE'];
  }

  const REMOVE_BODY = data && (method === HttpMethod.GET || method === HttpMethod.DELETE);
  if (REMOVE_BODY) {
    url = appendQueryParams(url, data as Record<string, string | number>);
    data = undefined;
  }

  const axiosOptions: AxiosRequestConfig<T> = {
    method,
    url,
    data,
    headers: appendHeaders(headers),
  };

  const instance = axios.create({
    timeout,
    baseURL: baseUrl,
  });

  try {
    const res = await instance.request<T>(axiosOptions);
    return res.data;
  } catch (error) {
    const e = error as AxiosError;
    const errorObj = {
      url: axiosOptions.url,
      method: axiosOptions.method,
      message: e.message,
      status: e.response?.status || null,
      response: e.response?.data || null,
    };
    throw errorObj;
  }
};
