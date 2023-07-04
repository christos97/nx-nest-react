import { Module } from '@nestjs/common';
import { ServerNestClusterModule } from '@ntua-saas-10/server/nest/cluster';
import { RenderModule } from '@ntua-saas-10/server/nest/render';

@Module({
  imports: [RenderModule, ServerNestClusterModule],
})
export class AppModule {}
