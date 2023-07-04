import { UserRole } from '@ntua-saas-10/shared-consts';
import { z } from 'zod';

/**
 * @description `UserRolesSchema` - ZodSchema
 */
export const UserRolesSchema = z.array(z.nativeEnum(UserRole));
export type UserRolesType = z.infer<typeof UserRolesSchema>;
