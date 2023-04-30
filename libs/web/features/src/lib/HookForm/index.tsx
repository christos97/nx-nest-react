import { type ZodRawShape } from 'zod';
import { useHookForm } from '@ntua-saas-10/web/utils';
import { FormProvider } from 'react-hook-form';
import { HookFormProps } from './types';

const Form: React.FC<HookFormProps<ZodRawShape>> = ({
  children,
  path,
  schema,
  httpMethod = 'POST',
  defaultValues,
}) => {
  const { methods, onSubmit } = useHookForm({ path, schema, httpMethod, defaultValues });
  return (
      <FormProvider { ...methods } >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          { children }
        </form>
      </FormProvider>
  );
};

export default Form;
export type { HookFormProps };
