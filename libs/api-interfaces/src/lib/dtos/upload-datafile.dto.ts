import { createZodDto } from '@anatine/zod-nestjs';
import {
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
} from '../schemas/resources/datafile.schema';

export class UploadDatafileRequestDto extends createZodDto(UploadDatafileRequestSchema) {}
export class UploadDatafileResponseDto extends createZodDto(UploadDatafileResponseSchema) {}
