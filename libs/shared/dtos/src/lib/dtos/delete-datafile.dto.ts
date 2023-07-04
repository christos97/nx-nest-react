import { createZodDto } from '@anatine/zod-nestjs';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export class DeleteDatafileRequestDto extends createZodDto(Schemas.DeleteDatafileRequestSchema) {}

export class DeleteDatafileResponseDto extends createZodDto(Schemas.DeleteDatafileResponseSchema) {}
