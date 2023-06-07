import UserSchema from './user.schema';
import { UploadDatafileRequestSchema } from './datafile.schema';
import { HttpAction } from '@ntua-saas-10/shared-consts';

const { retrieve, create } = HttpAction;

const ResourcesSchemas = {
  users: { [retrieve]: UserSchema, [create]: UserSchema },
  datafiles: { [create]: UploadDatafileRequestSchema },
} as const;

export type ResourcesSchemas = typeof ResourcesSchemas;
export default ResourcesSchemas;
