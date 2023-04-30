import { useForm, type DeepPartial, type ErrorOption } from 'react-hook-form';
import { useReactMutation } from './useReactMutation.hook';
import { type ZodRawShape, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
interface UseHookFormProps<T extends ZodRawShape, K> {
  path: string;
  schema: z.ZodObject<T>;
  httpMethod?: 'POST' | 'PUT' | 'PATCH';
  defaultValues?: DeepPartial<T>;
  response?: K;
}

export const useHookForm = <T extends ZodRawShape, K>({
  path,
  schema,
  httpMethod = 'POST',
  defaultValues,
}: UseHookFormProps<T, K>) => {
  const { mutate, ...mutation } = useReactMutation<T, K>(path, httpMethod);
  const methods = useForm<T, K>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: T) => {
    try {
      mutate(data);
    } catch (error: unknown) {
      const e = error as ErrorOption;
      methods.setError('root', e);
    }
  };

  return {
    methods,
    onSubmit,
    ...mutation,
  };
};
