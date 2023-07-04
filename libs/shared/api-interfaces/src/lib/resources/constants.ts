/**
 * `ResourcePath` All the resources that are available in the API.
 */
export const ResourcePath = {
  /** `user` Resource */
  users: 'users',

  /** `datafile` Resource */
  datafiles: 'datafiles',
} as const;

export type ResourcePath = (typeof ResourcePath)[keyof typeof ResourcePath];
