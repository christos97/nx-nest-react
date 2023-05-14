import { z } from 'zod';
import UserQuotaSchema from '../quotas';

/**
 * @constant `UserSchema` - ZodSchema
 */
const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  emailVerified: z.boolean().optional(),
  isProMember: z.boolean().optional(),
  disabled: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  providerId: z.string().optional(),
  tenantId: z.string().optional(),
  lastLoginAt: z.date().optional(),
  markSuspiciousAt: z.date().optional(),
  dangerLevel: z.number().optional(),
  userQuota: UserQuotaSchema,
});

export default UserSchema;
