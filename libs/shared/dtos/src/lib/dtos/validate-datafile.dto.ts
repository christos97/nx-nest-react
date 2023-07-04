import { createZodDto } from '@anatine/zod-nestjs';
import {
  ValidateDatafileRequestSchema,
  ValidateDatafileResponseSchema,
} from '@ntua-saas-10/shared-schemas';

export class ValidateDatafileRequestDto extends createZodDto(ValidateDatafileRequestSchema) {}

export class ValidateDatafileResponseDto extends createZodDto(ValidateDatafileResponseSchema) {}
