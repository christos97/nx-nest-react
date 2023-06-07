/**
 * @global `@ntua-saas-10/shared-consts
 * @readonly `UserRole` const assertion
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
export type UserRole = keyof typeof UserRole;
