import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const I18nStreamSchema = z
  .object({
    common: z
      .object({
        home: z.string(),
        login: z.string(),
        logout: z.string(),
      })
      .strict(),
    auth: z
      .object({
        hero1: z.string(),
        description: z.string(),
      })
      .strict(),
    home: z
      .object({
        hero1: z.string(),
        description: z.string(),
      })
      .strict(),
  })
  .strict();

export const GetI18nStreamZ = extendApi(I18nStreamSchema);

export class GetI18nStreamDto extends createZodDto(GetI18nStreamZ) {}
