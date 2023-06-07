import { createZodDto } from '@anatine/zod-nestjs';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export class ValidateDatafileRequestDto extends createZodDto(
  Schemas.ValidateDatafileRequestSchema,
) {}
