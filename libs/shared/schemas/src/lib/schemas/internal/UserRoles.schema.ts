import { z } from 'zod';
import { UserRole } from '@ntua-saas-10/shared-consts';

/**
 * @description `UserRolesSchema` - ZodSchema
 */
export const UserRolesSchema = z.array(z.nativeEnum(UserRole));
export type UserRolesType = z.infer<typeof UserRolesSchema>;
export default UserRolesSchema;
