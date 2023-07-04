import { AbstractRepository } from '@ntua-saas-10/server/nest/database';

import type { Model } from 'mongoose';

import type { UserDocument } from './user.schema';

export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(model: Model<UserDocument>) {
    super(model);
  }
}
