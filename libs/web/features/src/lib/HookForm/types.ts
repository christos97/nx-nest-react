import { type DeepPartial } from 'react-hook-form';
import { type ZodRawShape, z } from 'zod';

export interface HookFormProps<T extends ZodRawShape> {
  children?: React.ReactNode;
  path: string;
  schema: z.ZodObject<T>;
  httpMethod?: 'POST' | 'PUT' | 'PATCH';
  defaultValues?: DeepPartial<T>;
}
