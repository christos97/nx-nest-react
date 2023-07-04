import { Module } from '@nestjs/common';

import { DatabaseModule } from '@ntua-saas-10/server/nest/database';

import { type UserDocument, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule.forFeature<UserDocument>({
      name: UsersService.name,
      schema: UserSchema,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
