import { z } from 'zod';

import { UserAttributesSchema } from './UserAttributes.schema';
import { UserQuotaSchema } from './UserQuota.schema';
import { UserRolesSchema } from './UserRoles.schema';

/**
 * @description `UserCustomClaimsSchema` - ZodSchema
 */
export const UserCustomClaimsSchema = z
  .object({
    disabled: z.boolean().default(false),
    roles: UserRolesSchema,
    quota: UserQuotaSchema,
    attributes: UserAttributesSchema,
  })
  .deepPartial()
  .strict();

export type UserCustomClaims = z.infer<typeof UserCustomClaimsSchema>;
