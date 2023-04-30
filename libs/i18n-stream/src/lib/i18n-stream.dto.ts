import { I18nStreamSchema } from '@ntua-saas-10/api-interfaces';
import { extendApi } from '@anatine/zod-openapi';

export const GetI18nStreamZ = extendApi(I18nStreamSchema);
