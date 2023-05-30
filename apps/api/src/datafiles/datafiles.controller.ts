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
  Req,
} from '@nestjs/common';
import { DatafilesService } from './datafiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { AuthRequest, UploadDatafileRequestDto, UploadDatafileResponseDto } from '@ntua-saas-10/api-interfaces';
import { FileTypes, MAX_FILE_SIZE_KB } from './datafiles.constants';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { FilenameService } from '@ntua-saas-10/common';
import { ConfigService } from '@nestjs/config';

@Controller('datafiles')
export class DatafilesController {
  private readonly logger = new Logger(DatafilesController.name);
  private readonly FILES_DEST: string;

  constructor(
    private readonly datafilesService: DatafilesService,
    private readonly filenameService: FilenameService,
    private readonly configService: ConfigService,
  ) {
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
    @Req() req: AuthRequest,
  ): Promise<UploadDatafileResponseDto> {
    const { chartType } = body;

    const { newFilename } = this.filenameService.generateFileInfo(datafile.originalname, chartType);
    const uploadMetadata = await this.datafilesService.uploadToStorage(datafile, this.FILES_DEST, newFilename, {
      chartType,
    });

    return {
      statusCode: 200,
      message: 'Datafile uploaded successfully',
      file: {
        id: uploadMetadata.id,
        uid: req.user?.uid ?? '',
        name: uploadMetadata.name,
        url: uploadMetadata.mediaLink,
        meta: {
          chartType: chartType,
          createdAt: uploadMetadata.timeCreated,
        },
      },
    };
  }
}
