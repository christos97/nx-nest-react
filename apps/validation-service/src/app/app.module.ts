import { Module } from '@nestjs/common';
import { ValidationModule } from '@ntua-saas-10/server/nest/validation';

@Module({
  imports: [ValidationModule],
})
export class AppModule {}
