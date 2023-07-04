import { join } from 'path';

import { Module } from '@nestjs/common';
import {
  I18nStreamController,
  I18nStreamModule,
  I18nStreamService,
} from '@ntua-saas-10/server/nest/i18n-stream';

@Module({
  imports: [I18nStreamModule.forRoot({ rootPath: join(__dirname, 'assets', 'i18n') })],
  controllers: [I18nStreamController],
  providers: [I18nStreamService],
})
export class AppModule {}
