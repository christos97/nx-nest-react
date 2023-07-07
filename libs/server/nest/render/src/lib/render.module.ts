import { Module } from '@nestjs/common';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';

import { RenderController } from './render.controller';

import { RenderService } from './render.service';

@Module({
  controllers: [RenderController],
  providers: [RenderService, DatafilesService, ChartConfigService],
})
export class RenderModule {}
