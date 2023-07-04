import { z } from 'zod';

/**
 * @description `UserQuotaSchema` - ZodSchema
 */
export const UserQuotaSchema = z
  .object({
    current: z.number().int().default(100),
    max: z.number().int().default(100),
    isProMember: z.boolean().default(false),
  })
  .strict();

export type UserQuota = z.infer<typeof UserQuotaSchema>;
