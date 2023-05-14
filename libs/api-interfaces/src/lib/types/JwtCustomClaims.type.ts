import type { ParsedToken } from 'firebase/auth';
import type { UserQuota } from './UserQuota.type';

/**
 * Custom claims are used to store metadata on the user, such as the quota.
 * @see https://firebase.google.com/docs/auth/admin/custom-claims
 */
export interface JwtCustomClaims extends ParsedToken {
  quota: UserQuota;
  role: 'admin' | 'user';
}
