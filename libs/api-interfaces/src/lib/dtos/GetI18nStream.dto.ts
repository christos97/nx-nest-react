import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { ServicesSchemas } from '../schemas';

export const { I18nStreamSchema } = ServicesSchemas;
export const GetI18nStreamZ = extendApi(I18nStreamSchema);

export class GetI18nStreamDto extends createZodDto(GetI18nStreamZ) {}
