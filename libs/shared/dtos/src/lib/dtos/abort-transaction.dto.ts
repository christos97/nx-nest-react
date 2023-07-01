import { Schemas } from '@ntua-saas-10/shared-schemas';
import { createZodDto } from '@anatine/zod-nestjs';

export class TransactionRequestDto extends createZodDto(
  Schemas.ServicesSchemas.TransactionSchema,
) {}
