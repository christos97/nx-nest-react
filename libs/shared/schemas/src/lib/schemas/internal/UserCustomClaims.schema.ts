import { z } from 'zod';
import { UserQuotaSchema } from './UserQuota.schema';
import { UserRolesSchema } from './UserRoles.schema';
import { UserAttributesSchema } from './UserAttributes.schema';

/**
 * @description `UserCustomClaimsSchema` - ZodSchema
 */
export const UserCustomClaimsSchema = z.object({
  roles: UserRolesSchema,
  quota: UserQuotaSchema,
  attributes: UserAttributesSchema,
});

export default UserCustomClaimsSchema;
export type UserCustomClaims = z.infer<typeof UserCustomClaimsSchema>;
