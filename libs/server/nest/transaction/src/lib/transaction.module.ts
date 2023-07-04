import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';

import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [ConfigModule],
  controllers: [TransactionController],
  providers: [TransactionService, ChartConfigService, DatafilesService, ConfigService],
})
export class TransactionModule {}
