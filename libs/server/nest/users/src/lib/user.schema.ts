import type { AbstractDocument } from '@ntua-saas-10/server/nest/database';
import type { User } from '@ntua-saas-10/shared-types';
import { Schema } from 'mongoose';

export interface UserDocument extends User, AbstractDocument {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserSchema = new Schema<UserDocument>({} as Record<keyof UserDocument, any>, {
  collection: 'users',
  timestamps: true,
  strict: false,
  validateBeforeSave: false,
});

UserSchema.index({ uid: 1 }, { unique: true });
UserSchema.index({ createdAt: -1 }, { background: true });
