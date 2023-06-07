import { z } from 'zod';

/**
 * Not exposed to the API
 * @description `UserQuotaSchema` - ZodSchema
 */
export const UserQuotaSchema = z.object({
  current: z.number().int(),
  max: z.number().int(),
  isProMember: z.boolean().optional(),
});

export default UserQuotaSchema;
export type UserQuota = z.infer<typeof UserQuotaSchema>;
