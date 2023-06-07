import { Schemas } from '@ntua-saas-10/shared-schemas';
import { HttpMethod } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';

const { GET, POST, PATCH, DELETE } = HttpMethod;
const users = 'users';

/**
 * @description The `users` resource endpoint
 */
const UsersResource: Types.ResourceEndpoint = {
  list: {
    path: users,
    httpMethod: GET,
  },
  retrieve: {
    path: `${users}/{{id}}`,
    httpMethod: GET,
  },
  create: {
    path: users,
    httpMethod: POST,
    schema: Schemas.ResourcesSchemas.users.create,
  },
  update: {
    path: `${users}/{{id}}`,
    httpMethod: PATCH,
    // schema: undefined,
  },
  delete: {
    path: `${users}/{{id}}`,
    httpMethod: DELETE,
  },
} as const;

export default UsersResource;
