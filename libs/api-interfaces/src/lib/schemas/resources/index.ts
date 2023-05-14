import UserSchema from './user.schema';
import { UploadDatafileRequestSchema } from './datafile.schema';

const ResourcesSchemas = {
  users: UserSchema,
  datafiles: UploadDatafileRequestSchema,
};

export default ResourcesSchemas;
