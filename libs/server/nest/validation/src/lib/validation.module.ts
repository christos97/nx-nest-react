import { Module } from '@nestjs/common';

import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { NotificationsService } from '@ntua-saas-10/server/nest/notifications';
import { TransactionService } from '@ntua-saas-10/server/nest/transaction';

import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  controllers: [ValidationController],
  providers: [
    ValidationService,
    DatafilesService,
    ChartConfigService,
    TransactionService,
    NotificationsService,
  ],
})
export class ValidationModule {}
