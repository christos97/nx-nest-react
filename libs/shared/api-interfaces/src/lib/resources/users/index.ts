import { HttpMethod } from '@ntua-saas-10/shared-consts';

import type { User, UserCustomClaims } from '@ntua-saas-10/shared-types';

import { ResourcePath } from '../constants';
import { resourceGen, crudResourceGen } from '../utils';

const resource = 'users';
const baseUrl = process.env['USER_SERVICE_URL'] || '';

const { POST } = HttpMethod;

export const UsersResource = {
  ...crudResourceGen<User>({
    baseUrl,
    resourcePath: ResourcePath[resource],
  }),
  auth: {
    setCustomClaims: (id: string, body: Partial<UserCustomClaims>): Promise<UserCustomClaims> =>
      resourceGen<UserCustomClaims>({
        baseUrl,
        method: POST,
        path: `${resource}/${id}/auth`,
        data: body,
      }),
  },
} as const;
