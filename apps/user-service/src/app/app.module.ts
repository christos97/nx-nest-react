import { Module } from '@nestjs/common';
import { UsersModule } from '@ntua-saas-10/server/nest/users';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
