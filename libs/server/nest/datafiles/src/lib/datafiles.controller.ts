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
  Delete,
  HttpCode,
} from '@nestjs/common';
import { DatafilesService } from './datafiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { ContentType, NotificationType } from '@ntua-saas-10/shared-consts';
import { UploadDatafileRequestDto, UploadDatafileResponseDto } from '@ntua-saas-10/shared-dtos';
import { MAX_FILE_SIZE_KB } from './datafiles.constants';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { FilenameService } from '@ntua-saas-10/server/nest/filename';
import { ConfigService } from '@nestjs/config';
import type { Types } from '@ntua-saas-10/shared-types';
import { NotificationsService } from '@ntua-saas-10/server/nest/notifications';
import { DeleteDatafileRequestDto, DeleteDatafileResponseDto } from '@ntua-saas-10/shared-dtos';

@Controller('datafiles')
export class DatafilesController {
  private readonly logger = new Logger(DatafilesController.name);
  private readonly FILES_DEST: string;

  constructor(
    private readonly datafilesService: DatafilesService,
    private readonly filenameService: FilenameService,
    private readonly configService: ConfigService,
    private readonly notificationsService: NotificationsService,
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

    const { fileId, newFilename } = this.filenameService.generateFileInfo(
      datafile.originalname,
      chartType,
    );
    const uploadMetadata = await this.datafilesService.uploadToStorage(
      datafile,
      this.FILES_DEST,
      newFilename,
      {
        chartId: fileId,
        chartType,
        uid: req.user.uid,
        nextStep: 'validate',
        contentEncoding: 'UTF-8',
      },
    );

    this.logger.log(`Uploaded file ${uploadMetadata.name} to ${uploadMetadata.mediaLink}`);

    await this.notificationsService.saveNotificationToFirestore(req.user.uid, fileId, {
      type: NotificationType.success,
      createdAt: new Date(),
      delivered: false,
      data: {
        title: 'Datafile uploaded successfully',
        message: 'Validation in progress...',
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Datafile uploaded successfully',
      file: {
        id: fileId,
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

  @Delete()
  @HttpCode(204)
  @UsePipes(ZodValidationPipe)
  async deleteDatafile(
    @Body() body: DeleteDatafileRequestDto,
    @Req() req: Types.AuthRequest,
  ): Promise<DeleteDatafileResponseDto> {
    const { uploadedDatafilePath } = body;

    await this.datafilesService.deleteFile(uploadedDatafilePath, req.user.uid);

    this.logger.log(`Deleted file ${uploadedDatafilePath}`);

    return {
      statusCode: 204,
      message: 'Datafile deleted successfully',
    };
  }
}
