import { z } from 'zod';

/**
 * Not exposed to the API
 * @description `UserAttributesSchema` - ZodSchema
 */
export const UserAttributesSchema = z.object({
  projectId: z.string().optional(),
});

export default UserAttributesSchema;
export type UserAttributes = z.infer<typeof UserAttributesSchema>;
