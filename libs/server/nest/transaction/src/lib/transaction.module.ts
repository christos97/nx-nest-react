import { Module } from '@nestjs/common';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, ChartConfigService, DatafilesService],
})
export class TransactionModule {}
