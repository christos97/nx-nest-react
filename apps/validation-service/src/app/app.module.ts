import { Module } from '@nestjs/common';
import { ValidationModule } from '@ntua-saas-10/nest-resources/validation';

@Module({
  imports: [ValidationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
