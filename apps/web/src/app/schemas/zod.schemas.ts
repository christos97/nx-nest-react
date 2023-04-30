import { z } from 'zod';
import {
  INVALID_BODY,
  INVALID_TITLE,
} from '../constants/validation-errors.constants';

export const ZodSchemas = {
  resources: {
    posts: {
      create: z
        .object({
          title: z.string().min(8, INVALID_TITLE),
          body: z.string().min(30, INVALID_BODY),
        })
        .strict(),
    },
  },
} as const;

export type ZodSchemas = typeof ZodSchemas;
export default ZodSchemas;
