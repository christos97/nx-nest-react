import { useQuery, type QueryKey } from '@tanstack/react-query';
import { useAxios } from './useAxios.hook';
import { type AxiosResponse } from 'axios';

type ApiResponse<T> = AxiosResponse<T>;

export const useReactQuery = <T>(key: QueryKey, url: string) => {
  const [axios] = useAxios();
  const { isLoading, error, data } = useQuery<T, Error>(key, async () => {
    const res: ApiResponse<T> = await axios.get<T>(url);
    return res?.data as T;
  });

  return { isLoading, error, data };
};
