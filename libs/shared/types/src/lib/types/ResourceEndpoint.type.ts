import type { HttpAction, HttpMethod } from '@ntua-saas-10/shared-consts';
import type { ZodRawShape, ZodObject } from 'zod';

export type ResourceEndpoint<T extends ZodRawShape = ZodRawShape> = {
  [key in HttpAction]: {
    path: string;
    httpMethod: HttpMethod;
    schema?: ZodObject<T>;
  };
};
