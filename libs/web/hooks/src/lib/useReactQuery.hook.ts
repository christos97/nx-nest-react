import { useQuery, type QueryKey } from '@tanstack/react-query';
import { useAxios } from './useAxios.hook';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type ApiResponse<T> = AxiosResponse<T>;

/**
 * @param key `QueryKey`
 * @see `@tanstack/react-query`
 * @param url Path to the API endpoint - Concats with the base URL from axios instance
 * @returns isLoading, error, data
 */
export const useReactQuery = <T>(key: QueryKey, url: string, config?: AxiosRequestConfig) => {
  const [axios] = useAxios(config ?? {});
  const { isLoading, error, data } = useQuery<T, Error>(key, async () => {
    const res: ApiResponse<T> = await axios.get<T>(url);
    return res?.data as T;
  });

  return { isLoading, error, data };
};
