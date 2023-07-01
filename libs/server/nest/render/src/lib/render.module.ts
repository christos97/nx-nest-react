import { Module } from '@nestjs/common';
import { RenderService } from './render.service';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { RenderController } from './render.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';

@Module({
  imports: [ConfigModule],
  controllers: [RenderController],
  providers: [RenderService, ConfigService, DatafilesService, ChartConfigService],
})
export class RenderModule {}
