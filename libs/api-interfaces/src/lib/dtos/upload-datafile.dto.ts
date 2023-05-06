import { createZodDto } from '@anatine/zod-nestjs';

import {
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
} from '../schemas/datafiles.schemas';

export class UploadDatafileRequestDto extends createZodDto(
  UploadDatafileRequestSchema
) {}
export class UploadDatafileResponseDto extends createZodDto(
  UploadDatafileResponseSchema
) {}
