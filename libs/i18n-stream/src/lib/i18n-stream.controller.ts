import {
  Controller,
  Get,
  Param,
  StreamableFile,
  UsePipes,
} from '@nestjs/common';
import { I18nStreamService } from './i18n-stream.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetI18nStreamDto } from './i18n-stream.dto';

@Controller('i18n')
@UsePipes(ZodValidationPipe)
export class I18nStreamController {
  constructor(private readonly i18nStreamService: I18nStreamService) {}

  @Get(':lng')
  @ApiCreatedResponse({
    type: GetI18nStreamDto,
  })
  getLanguage(@Param('lng') lng: string): StreamableFile {
    return new StreamableFile(this.i18nStreamService.getStream(`${lng}.json`));
  }
}