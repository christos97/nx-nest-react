import { useQuery, type QueryKey } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxios.hook';

interface ApiResponse<T> {
  data: T | undefined;
}

export const useReactQuery = <T>(key: QueryKey, url: string) => {
  const [axios] = useAxiosInstance();
  const { isLoading, error, data } = useQuery<ApiResponse<T>, Error>(
    key,
    async () => {
      const res = await axios.get<ApiResponse<T>>(url);
      return res?.data;
    }
  );

  return { isLoading, error, data };
};
