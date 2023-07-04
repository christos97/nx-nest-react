import { z } from 'zod';

import { UserCustomClaimsSchema } from '../internal/UserCustomClaims.schema';

/**
 * @constant `UserSchema` - ZodSchema
 */
export const UserSchema = z
  .object({
    uid: z.string(), // Firebase uid
    email: z.string().email(),
    displayName: z.string().optional(),
    photoURL: z.string().nullable().optional(),
    createdAt: z.string().transform((str) => new Date(str)),
    updatedAt: z.string().transform((str) => new Date(str)).optional(), // prettier-ignore
    emailVerified: z.boolean().default(false).optional(),
    disabled: z.boolean().default(false).optional(),
    phoneNumber: z.string().optional().nullable(),
    providerId: z.string().optional(),
    tenantId: z.string().optional().nullable(),
    dangerLevel: z.number().default(0).optional(),
    customClaims: UserCustomClaimsSchema,
  })
  .strict();

export const CreateUserSchema = UserSchema;

export const UpdateUserSchema = UserSchema.omit({
  uid: true,
  email: true,
  createdAt: true,
  providerId: true,
}).strict();
