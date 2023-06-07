import { createZodDto } from '@anatine/zod-nestjs';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export class UploadDatafileRequestDto extends createZodDto(Schemas.UploadDatafileRequestSchema) {}
export class UploadDatafileResponseDto extends createZodDto(Schemas.UploadDatafileResponseSchema) {}
