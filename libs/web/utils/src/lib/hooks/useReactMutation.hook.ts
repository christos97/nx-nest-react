import { useMutation } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxios.hook';

interface ApiResponse<T> {
  data: T | undefined;
}

interface FormData<T> {
  data: T;
}

interface MutationResponse<T> {
  // mutate<T>(url: string): UseMutateFunction<ApiResponse<T>, Error, FormData<T>, unknown>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: ApiResponse<T> | undefined;
}

export const useReactMutation = <T, K>(url: string): MutationResponse<T> => {
  const [axios] = useAxiosInstance();
  const { isLoading, isError, error, isSuccess, data } = useMutation<
    ApiResponse<T>,
    Error,
    FormData<K>,
    unknown
  >(async (formData: FormData<K>) => {
    const res = await axios.post<ApiResponse<T>>(url, formData);
    return res?.data;
  });

  return { isLoading, isError, error, isSuccess, data };
};
