import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios.hook';
import { type AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiResponse<T> = AxiosResponse<T>;

interface UseReactMutation<T, K> {
  mutate: (data: T) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: K | undefined;
}

/**
 *
 * @param url Path to the API endpoint - Concats with the base URL from axios instance
 * @param method Default is POST
 * @returns Mutate function, isLoading, isError, error, isSuccess, data
 */
export const useReactMutation = <T = unknown, K = unknown>(
  url: string,
  method: Exclude<HttpMethod, 'GET'> = 'POST'
): UseReactMutation<T, K> => {
  const [axios] = useAxios();
  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation<
    K,
    Error,
    T,
    unknown
  >(async (data: T) => {
    const res: ApiResponse<K> = await axios.request<K>({
      url,
      method,
      data: method !== 'DELETE' && data ? data : undefined,
    });
    return res?.data;
  });

  return { mutate, isLoading, isError, error, isSuccess, data };
};
