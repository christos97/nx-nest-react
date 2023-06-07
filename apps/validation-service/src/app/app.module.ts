import { Module } from '@nestjs/common';
import { ValidationModule } from '@ntua-saas-10/server/nest/services/validation';

@Module({
  imports: [ValidationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
