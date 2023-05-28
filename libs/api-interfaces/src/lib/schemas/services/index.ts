import { z } from 'zod';

export const ServicesSchemas = {
  I18nStreamSchema: z
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
          errors: z
            .object({
              signUpFailed: z.string(),
              emailInUse: z.string(),
              invalidEmail: z.string(),
              weakPassword: z.string(),
              minPasswordLength: z.string(),
              maxPasswordLength: z.string(),
              passwordsDontMatch: z.string(),
            })
            .strict(),
        })
        .strict(),
      home: z
        .object({
          hero1: z.string(),
          description: z.string(),
        })
        .strict(),
    })
    .strict(),
};

export default ServicesSchemas;
