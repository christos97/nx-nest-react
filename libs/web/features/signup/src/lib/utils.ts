import type { TFunction } from 'i18next';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './constants';

export const getErrorMessages = (t: TFunction) => ({
  minPasswordLength: (length = MIN_PASSWORD_LENGTH) => t(`errors.minPasswordLength`, { length }),
  maxPasswordLength: (length = MAX_PASSWORD_LENGTH) => t(`errors.maxPasswordLength`, { length }),
  invalidEmail: () => t(`errors.invalidEmail`),
  passwordsDontMatch: () => t(`errors.passwordsDontMatch`),
  emailAlreadyInUse: () => t(`errors.emailAlreadyInUse`),
});
