/**
 * @fileoverview i18n constants.
 * @global apps/web/~/constants/i18n.constants.ts
 */

import { elGR, enUS } from '@mui/material/locale';

/**
 * 1. Import the locale from `@mui/material/locale`.
 * 2. Append `country_code` to this array to add new languages.
 * 3. Add the language to the `Locales` object
 *
 * @example import { elGR, frFR, deDE } from '@mui/material/locale';
 * @example extraLanguages = ['el', 'fr', 'de']
 * @example Locales = { el: elGR, fr: frFR, de: deDE }
 */
const extraLanguages = ['el'];

/** `DEFAULT_LANGUAGE` */
export const DEFAULT_LANGUAGE = 'en';

export const Locales = {
  en: enUS,
  el: elGR,
} as const;
export type SupportedLanguages = keyof typeof Locales;

type DefaultLanguage = typeof DEFAULT_LANGUAGE;
type ExtraLanguages = Exclude<SupportedLanguages, DefaultLanguage>;

const EXTRA_LANGUAGES = extraLanguages as ExtraLanguages[];

/** `SUPPORTED_LANGUAGES` for specific web app */
export const SUPPORTED_LANGUAGES: SupportedLanguages[] = [DEFAULT_LANGUAGE, ...EXTRA_LANGUAGES];

export const DEFAULT_NAMESPACE = 'translation';

const common = 'common';
const auth = 'auth';
const home = 'home';

export const TRANSLATE_PREFIX = {
  COMMON: { keyPrefix: common },
  AUTH: { keyPrefix: auth },
  HOME: { keyPrefix: home },
} as const;

export const TRANSLATE_NS = {
  COMMON: common,
  AUTH: auth,
  HOME: home,
} as const;

export type TranslatePrefix = typeof TRANSLATE_PREFIX;
export type TranslateNamespace = typeof TRANSLATE_NS;
