// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Multer } from 'multer';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Logger,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UsePipes,
} from '@nestjs/common';
import { DatafilesService } from './datafiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { UploadDatafileRequestDto, UploadDatafileResponseDto } from '@ntua-saas-10/api-interfaces';
import { FileTypes, MAX_FILE_SIZE_KB } from './datafiles.constants';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { FilenameService } from '@ntua-saas-10/common';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  STORAGE_BASE_URL: string;
  FILES_DEST: string;
}

@Controller('datafiles')
export class DatafilesController {
  private readonly logger = new Logger(DatafilesController.name);
  private readonly STORAGE_BASE_URL: string;
  private readonly FILES_DEST: string;

  constructor(
    private readonly datafilesService: DatafilesService,
    private readonly filenameService: FilenameService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.STORAGE_BASE_URL = this.configService.getOrThrow('STORAGE_BASE_URL');
    this.FILES_DEST = this.configService.getOrThrow('FILES_DEST');
  }

  @Post('upload')
  @UsePipes(ZodValidationPipe)
  @UseInterceptors(FileInterceptor('datafile'))
  @ApiConsumes('multipart/form-data')
  async uploadDatafile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_KB }),
          new FileTypeValidator({ fileType: FileTypes.CSV }),
        ],
      }),
    )
    datafile: Express.Multer.File,
    @Body() body: UploadDatafileRequestDto,
  ): Promise<UploadDatafileResponseDto> {
    const { chartType } = body;

    const { fileId, newFilename } = this.filenameService.generateFileInfo(
      datafile.originalname,
      chartType,
    );
    await this.datafilesService.uploadToStorage(datafile, this.FILES_DEST, newFilename, {
      chartType,
    });

    return {
      statusCode: 200,
      message: 'Datafile uploaded successfully',
      file: {
        id: fileId,
        name: newFilename,
        url: `${this.STORAGE_BASE_URL}/${this.FILES_DEST}/${newFilename}`,
        meta: {
          chartType: chartType,
          createdAt: new Date(),
        },
      },
    };
  }
}
