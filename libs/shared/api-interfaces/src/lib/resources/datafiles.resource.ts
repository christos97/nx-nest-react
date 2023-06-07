import { Schemas } from '@ntua-saas-10/shared-schemas';
import { HttpMethod } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';

const { GET, POST, PATCH, DELETE } = HttpMethod;
const datafiles = 'datafiles';

const DatafilesResource: Types.ResourceEndpoint = {
  list: {
    path: datafiles,
    httpMethod: GET,
  },
  retrieve: {
    path: `${datafiles}/{{id}}`,
    httpMethod: GET,
  },
  create: {
    path: datafiles,
    httpMethod: POST,
    schema: Schemas.ResourcesSchemas.datafiles.create,
  },
  update: {
    path: `${datafiles}/{{id}}`,
    httpMethod: PATCH,
    // schema: undefined,
  },
  delete: {
    path: `${datafiles}/{{id}}`,
    httpMethod: DELETE,
  },
} as const;

export default DatafilesResource;
