import { z } from 'zod';
import { INVALID_BODY, INVALID_TITLE } from '../errors/form-validation.errors';

const ResourcesSchemas = {
  posts: {
    create: z
      .object({
        title: z.string().min(8, INVALID_TITLE),
        body: z.string().min(30, INVALID_BODY),
      })
      .strict(),
    update: z
      .object({
        body: z.string().min(30, INVALID_BODY),
      })
      .strict(),
  },
};

export default ResourcesSchemas;
