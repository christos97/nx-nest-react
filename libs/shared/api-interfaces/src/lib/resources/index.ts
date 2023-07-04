//import { DatafilesResource } from './datafiles';
import { UsersResource } from './users';

/**
 * `ApiResources` All the resources that are available in the API.
 * @readonly
 */
export const ApiResources = {
  users: {
    ...UsersResource,
    // 'subResource': undefined
  } as const,
  /* datafiles: {
    ...DatafilesResource,
  } as const, */
} as const;

Object.freeze(ApiResources);

export type ApiResources = typeof ApiResources;

export { ResourcePath } from './constants';
