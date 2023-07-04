import { useQuery, type QueryKey } from '@tanstack/react-query';

import type { AxiosRequestConfig } from 'axios';

import { useAxios } from './useAxios.hook';

/**
 * @param key `QueryKey`
 * @see `@tanstack/react-query`
 * @param url Path to the API endpoint - Concats with the base URL from axios instance
 * @returns isLoading, error, data
 */
export const useReactQuery = <T>(key: QueryKey, url: string, config: AxiosRequestConfig = {}) => {
  const axios = useAxios(config);
  const { isLoading, error, data } = useQuery<T, Error>(
    key,
    async () => (await axios.get<T>(url)).data,
  );

  return { isLoading, error, data };
};
