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
  HttpStatus,
} from '@nestjs/common';
import { DatafilesService } from './datafiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { ContentType } from '@ntua-saas-10/shared-consts';
import { UploadDatafileRequestDto, UploadDatafileResponseDto } from '@ntua-saas-10/shared-dtos';
import { MAX_FILE_SIZE_KB } from './datafiles.constants';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { FilenameService } from '@ntua-saas-10/server/nest/services/filename';
import { ConfigService } from '@nestjs/config';
import type { Types } from '@ntua-saas-10/shared-types';

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

  @Post()
  @UsePipes(ZodValidationPipe)
  @UseInterceptors(FileInterceptor('datafile'))
  @ApiConsumes('multipart/form-data')
  async uploadDatafile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_KB }),
          new FileTypeValidator({ fileType: ContentType.text_csv }),
        ],
      }),
    )
    datafile: Express.Multer.File,
    @Body() body: UploadDatafileRequestDto,
    @Req() req: Types.AuthRequest,
  ): Promise<UploadDatafileResponseDto> {
    const { chartType } = body;

    const { newFilename } = this.filenameService.generateFileInfo(datafile.originalname, chartType);
    const uploadMetadata = await this.datafilesService.uploadToStorage(
      datafile,
      this.FILES_DEST,
      newFilename,
      {
        chartType,
        userId: req.user.uid,
        nextStep: 'validate',
      },
    );

    this.logger.log(`Uploaded file ${uploadMetadata.name} to ${uploadMetadata.mediaLink}`);
    return {
      statusCode: HttpStatus.OK,
      message: 'Datafile uploaded successfully',
      file: {
        id: uploadMetadata.id,
        name: uploadMetadata.name,
        url: uploadMetadata.mediaLink,
        meta: {
          chartType: chartType,
          createdAt: uploadMetadata.timeCreated,
          uid: req.user.uid,
        },
      },
    };
  }
}
