import { Controller, Get, Param, StreamableFile, UsePipes } from '@nestjs/common';
import { I18nStreamService } from './i18n-stream.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
//import { ApiCreatedResponse } from '@nestjs/swagger';
//import { I18nStreamDto } from '@ntua-saas-10/api-interfaces';

@Controller('i18n')
@UsePipes(ZodValidationPipe)
export class I18nStreamController {
  constructor(private readonly i18nStreamService: I18nStreamService) {}

  @Get(':lng')
  /* @ApiCreatedResponse({
    type: I18nStreamDto,
  }) */
  getLanguage(@Param('lng') lng: string): StreamableFile {
    return new StreamableFile(this.i18nStreamService.getStream(`${lng}.json`));
  }
}
