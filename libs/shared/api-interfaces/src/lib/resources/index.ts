import users from './users.resource';
import datafiles from './datafiles.resource';

export const Resources = {
  users,
  datafiles,
} as const;

export type Resources = typeof Resources;

export default Resources;
