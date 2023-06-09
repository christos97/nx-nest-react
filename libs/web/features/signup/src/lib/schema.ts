import { z } from 'zod';
import { getErrorMessages } from './utils';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './constants';
import type { Types } from '@ntua-saas-10/shared-types';
import type { TFunction } from 'i18next';

export const getPasswordSchema = (t: TFunction): z.ZodString => {
  const errMsg = getErrorMessages(t);
  return z
    .string()
    .min(MIN_PASSWORD_LENGTH, errMsg.minPasswordLength())
    .max(MAX_PASSWORD_LENGTH, errMsg.maxPasswordLength());
};

export const getSignUpFormSchema = (t: TFunction, password: z.ZodString) => {
  const errMsg = getErrorMessages(t);
  return z
    .object({
      email: z.string().email(errMsg.invalidEmail()),
      password: password,
      passwordRepeat: password,
    })
    .refine(({ password, passwordRepeat }) => password === passwordRepeat, {
      message: errMsg.passwordsDontMatch(),
      path: ['passwordRepeat'],
    });
};

export type SignUpFormData = z.infer<ReturnType<typeof getSignUpFormSchema>>;
export type SignUpFormFields = keyof SignUpFormData;

export interface SignUpFormSpecs {
  defaultValues: SignUpFormData;
  fields: {
    [key in SignUpFormFields]: Types.FieldSpec;
  };
}
