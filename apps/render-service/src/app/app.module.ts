import { Module } from '@nestjs/common';
import { RenderModule } from '@ntua-saas-10/server/nest/render';

@Module({
  imports: [RenderModule],
})
export class AppModule {}
