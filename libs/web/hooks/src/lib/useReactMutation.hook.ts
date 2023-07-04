import { HttpMethod } from '@ntua-saas-10/shared-consts';
import { useMutation } from '@tanstack/react-query';

import type { AxiosRequestConfig } from 'axios';

import { BASE_URL, DEFAULT_HEADERS } from './constants';
import { useAxios } from './useAxios.hook';

interface UseReactMutation<T, K> {
  mutate: (data: T) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: K | undefined;
}

/**
 * @param url Path to the API endpoint - Concats with the base URL from axios instance
 * @param method Default is `POST`
 * @returns Mutate function, isLoading, isError, error, isSuccess, data
 */
export const useReactMutation = <T = unknown, K = unknown>(
  url: string,
  method: Exclude<HttpMethod, 'GET'> = HttpMethod.POST,
  config: AxiosRequestConfig = {},
): UseReactMutation<T, K> => {
  const axios = useAxios(config);
  const { baseURL, headers = {} } = config;
  const requestConfig = {
    url,
    method,
    baseURL: baseURL || BASE_URL,
    headers: Object.keys(headers).length > 0 ? { ...DEFAULT_HEADERS, ...headers } : DEFAULT_HEADERS,
  };
  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation<K, Error, T, unknown>(
    async (data: T) => {
      try {
        const res = await axios.request<K>({
          ...requestConfig,
          data: method !== HttpMethod.DELETE && data ? data : undefined,
        });
        return res?.data;
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    },
  );
  return { mutate, isLoading, isError, error, isSuccess, data };
};
