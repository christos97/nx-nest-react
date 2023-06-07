import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export const { I18nStreamSchema } = Schemas.ServicesSchemas;
export const GetI18nStreamZ = extendApi(I18nStreamSchema);

export class I18nStreamDto extends createZodDto(GetI18nStreamZ) {}
