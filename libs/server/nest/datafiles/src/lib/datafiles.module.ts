import { Module } from '@nestjs/common';
import { DatafilesService } from './datafiles.service';
import { DatafilesController } from './datafiles.controller';
import { FilenameService } from '@ntua-saas-10/server/nest/filename';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsService } from '@ntua-saas-10/server/nest/notifications';

@Module({
  imports: [ConfigModule],
  controllers: [DatafilesController],
  providers: [DatafilesService, FilenameService, ConfigService, NotificationsService],
})
export class DatafilesModule {}
