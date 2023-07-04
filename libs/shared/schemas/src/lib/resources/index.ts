import { HttpAction } from '@ntua-saas-10/shared-consts';
import { z } from 'zod';

import { UploadDatafileRequestSchema } from './datafile.schema';
import { RenderChartConfigRequestSchema } from './render.schema';

import { UserSchema, CreateUserSchema, UpdateUserSchema } from './user.schema';

const { list, retrieve, create, update, remove } = HttpAction;

const ResourcesSchemas = {
  users: {
    [list]: z.array(UserSchema),
    [retrieve]: UserSchema,
    [create]: CreateUserSchema,
    [update]: UpdateUserSchema,
    [remove]: UserSchema,
  } as const,
  renders: {
    [list]: z.array(z.object({})),
    [retrieve]: z.object({}),
    [create]: RenderChartConfigRequestSchema,
    [update]: z.object({}),
    [remove]: z.object({}),
  } as const,
  datafiles: {
    [list]: UploadDatafileRequestSchema,
    [retrieve]: UploadDatafileRequestSchema,
    [create]: UploadDatafileRequestSchema,
    [update]: UploadDatafileRequestSchema,
    [remove]: UploadDatafileRequestSchema,
  } as const,
} as const;

Object.freeze(ResourcesSchemas);

export type ResourcesSchemas = typeof ResourcesSchemas;
export default ResourcesSchemas;
