import { elGR, enUS } from '@mui/material/locale';

export const Locales = {
  en: enUS,
  el: elGR,
} as const;
export type SupportedLanguages = keyof typeof Locales;

export const DEFAULT_LANGUAGE = 'en';
type DefaultLanguage = typeof DEFAULT_LANGUAGE;
type ExtraLanguages = Exclude<SupportedLanguages, DefaultLanguage>;

export const EXTRA_LANGUAGES: ExtraLanguages[] = ['el'];

export const SUPPORTED_LANGUAGES: SupportedLanguages[] = [
  DEFAULT_LANGUAGE,
  ...EXTRA_LANGUAGES,
];

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
