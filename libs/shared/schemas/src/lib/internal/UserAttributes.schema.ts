import { z } from 'zod';

/**
 * @description `UserAttributesSchema` - ZodSchema
 */
export const UserAttributesSchema = z
  .object({
    projectId: z.string(),
  })
  .strict();

export type UserAttributes = z.infer<typeof UserAttributesSchema>;
