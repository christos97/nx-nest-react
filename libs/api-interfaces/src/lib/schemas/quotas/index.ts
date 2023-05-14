import { z } from 'zod';

/**
 * Not exposed to the API
 * @description `UserQuotaSchema` - ZodSchema
 */
const UserQuotaSchema = z.object({
  current: z.number().int(),
  max: z.number().int(),
  isProMember: z.boolean().optional(),
});

export default UserQuotaSchema;
