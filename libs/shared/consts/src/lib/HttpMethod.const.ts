/**
 * @global `@/shared-consts/HttpMethod`
 * @readonly
 */
const HttpMethod = {
  /** `GET` method requests a representation of the specified resource. */
  GET: 'GET',
  /** The `POST` method submits an entity to the specified resource, often causing a change in state or side effects on the server. */
  POST: 'POST',
  /** The `PUT` method replaces all current representations of the target resource with the request payload. */
  PUT: 'PUT',
  /** The `PATCH` method applies partial modifications to a resource. */
  PATCH: 'PATCH',
  /** The `DELETE` method deletes the specified resource. */
  DELETE: 'DELETE',
} as const;

export { HttpMethod };
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
