/**
 * @global `@/shared-consts/HttpAction`
 * @readonly
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
  remove: 'remove',
} as const;

export { HttpAction };
export type HttpAction = (typeof HttpAction)[keyof typeof HttpAction];
