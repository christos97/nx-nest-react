import type { ZodRawShape } from 'zod';
import type { HookFormProps } from './types';
import { useHookForm } from '@ntua-saas-10/web/hooks';
import { FormProvider } from 'react-hook-form';

const HookForm: React.FC<HookFormProps<ZodRawShape>> = ({
  children,
  path,
  schema,
  httpMethod = 'POST',
  httpConfig = {},
  defaultValues,
}) => {
  const { methods, submitFn } = useHookForm({
    path,
    schema,
    httpMethod,
    httpConfig,
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitFn)}>{children}</form>
    </FormProvider>
  );
};

export default HookForm;
export type { HookFormProps };
