import type { ZodRawShape, ZodObject } from 'zod';
import { type HttpMethod, HttpMethods } from '../types';
import { ResourcesSchemas } from '../schemas';

export type Resource = typeof resources;

type Action = 'retrieve' | 'create' | 'update' | 'delete';

export type ResourcesEndpoints<T extends ZodRawShape> = {
  [key in Action]: {
    path: string;
    httpMethod: HttpMethod;
    schema?: ZodObject<T>;
  };
};

export const posts = {
  list: {
    path: 'posts',
    httpMethod: HttpMethods.GET,
  },
  retrieve: {
    path: `posts/{{id}}`,
    httpMethod: HttpMethods.GET,
  },
  create: {
    path: 'posts',
    httpMethod: HttpMethods.POST,
    schema: ResourcesSchemas.posts.create,
  },
  update: {
    path: `posts/{{id}}`,
    httpMethod: HttpMethods.PATCH,
    // schema: undefined,
  },
  delete: {
    path: 'posts',
    httpMethod: HttpMethods.DELETE,
  },
} as const;

export const resources = {
  posts,
} as const;

export default resources;
