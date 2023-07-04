/**
 * @global `@/shared-consts/UserRole`
 * @readonly
 */
const UserRole = {
  /** `admin` role has full access to all resources */
  admin: 'admin',
  /** `user` role has limited access to resources */
  user: 'user',
  /** `guest` role has no access to resources */
  guest: 'guest',
} as const;

export { UserRole };
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
