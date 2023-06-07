/**
 * @description HTTP Actions `CRUD`
 */
const HttpAction = {
  /** Retrieve a resource (GET) */
  retrieve: 'retrieve',

  /** List resources (GET) */
  list: 'list',

  /** Create a resource (POST) */
  create: 'create',

  /** Update a resource (PATCH) */
  update: 'update',

  /** Delete a resource (DELETE) */
  delete: 'delete',
} as const;

export { HttpAction };
export type HttpAction = (typeof HttpAction)[keyof typeof HttpAction];
