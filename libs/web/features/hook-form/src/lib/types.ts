import type { HttpMethod } from '@ntua-saas-10/api-interfaces';
import type { AxiosRequestConfig } from 'axios';
import type { DeepPartial } from 'react-hook-form';
import type { ZodRawShape, z } from 'zod';

export interface HookFormProps<T extends ZodRawShape> {
  /**
   * @example HookField
   * @example UiButton
   */
  children?: React.ReactNode;

  /** HTTP `path` to the API endpoint */
  path: string;

  /**
   * `Zod Schema` for validation
   * @see `@hookform/resolvers/zod`
   * */
  schema: z.ZodObject<T>;

  /** HTTP `method` for the API endpoint */
  httpMethod?: Exclude<HttpMethod, 'GET' | 'DELETE'>;

  /**
   * `AxiosRequestConfig` for the API endpoint
   * @see `useAxios`
   * @see `AxiosRequestConfig`
   */

  httpConfig?: AxiosRequestConfig;
  /**
   * Default falues for the form
   * @see `useForm`
   */

  defaultValues?: DeepPartial<T>;
}
