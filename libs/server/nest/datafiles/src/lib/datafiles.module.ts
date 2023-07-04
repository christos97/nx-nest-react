import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilenameService } from '@ntua-saas-10/server/nest/filename';

import { NotificationsService } from '@ntua-saas-10/server/nest/notifications';

import { DatafilesController } from './datafiles.controller';
import { DatafilesService } from './datafiles.service';

@Module({
  imports: [ConfigModule],
  controllers: [DatafilesController],
  providers: [DatafilesService, FilenameService, ConfigService, NotificationsService],
})
export class DatafilesModule {}
