/**
 * @fileoverview Custom hook for react-hook-form w/ @tanstack/react-query
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { HttpMethod } from '@ntua-saas-10/shared-consts';
import type { AxiosRequestConfig } from 'axios';
import { useForm, type DeepPartial, type ErrorOption } from 'react-hook-form';

import { type ZodRawShape, z } from 'zod';

import { useReactMutation } from './useReactMutation.hook';

interface UseHookFormProps<T extends ZodRawShape, K> {
  path: string;
  schema: z.ZodObject<T>;
  httpMethod?: Exclude<HttpMethod, 'PUT' | 'GET' | 'DELETE'>;
  httpConfig?: AxiosRequestConfig;
  defaultValues?: DeepPartial<T>;
  mode?: 'onSubmit' | 'onChange' | 'onBlur' | 'onTouched' | 'all';
  response?: K;
}

/**
 *  Hook for React Hook Form with React Query
 * @param path HTTP path to the API endpoint
 * @param schema `Zod Schema` for validation
 * @param httpMethod Default is `POST`
 * @param defaultValues Default values for the form
 * @returns Mutate function, isLoading, isError, error, isSuccess, data
 */
export const useHookForm = <T extends ZodRawShape, K>({
  path,
  schema,
  httpMethod = HttpMethod.POST,
  httpConfig = {},
  defaultValues,
  mode = 'onSubmit',
}: UseHookFormProps<T, K>) => {
  const { mutate, ...mutation } = useReactMutation<T, K>(path, httpMethod, httpConfig);
  const methods = useForm<T, K>({
    defaultValues,
    mode,
    resolver: zodResolver(schema),
  });

  const submitFn = (data: T) => {
    try {
      mutate(data);
    } catch (error: unknown) {
      const e = error as ErrorOption;
      methods.setError('root', e);
    }
  };

  return {
    ...mutation,
    methods,
    submitFn,
  };
};
