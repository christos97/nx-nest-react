import { createZodDto } from '@anatine/zod-nestjs';
import { ValidateDatafileRequestSchema } from '../schemas/resources/datafile.schema';

export class ValidateDatafileRequestDto extends createZodDto(ValidateDatafileRequestSchema) {}
