import type { ZodRawShape, ZodObject } from 'zod';
import { ResourcesSchemas } from '../schemas';
import type { HttpMethod as IHttpMethod } from '../types';
import { HttpMethod } from '../consts/HttpMethod.const';

export type Resource = typeof resources;

type Action = 'list' | 'retrieve' | 'create' | 'update' | 'delete';

export type ResourcesEndpoints<T extends ZodRawShape> = {
  [key in Action]: {
    path: string;
    httpMethod: IHttpMethod;
    schema?: ZodObject<T>;
  };
};

// replace(/{{id}}/g, value);
export const users = {
  list: {
    path: 'users',
    httpMethod: HttpMethod.GET,
  },
  retrieve: {
    path: `users/{{id}}`,
    httpMethod: HttpMethod.GET,
  },
  create: {
    path: 'users',
    httpMethod: HttpMethod.POST,
    schema: ResourcesSchemas.users,
  },
  update: {
    path: `users/{{id}}`,
    httpMethod: HttpMethod.PATCH,
    // schema: undefined,
  },
  delete: {
    path: 'users/{{id}}',
    httpMethod: HttpMethod.DELETE,
  },
} as const;

export const resources = {
  users,
} as const;

export default resources;
