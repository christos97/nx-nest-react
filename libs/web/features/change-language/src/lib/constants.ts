export const FLAGS = {
  en: '🇬🇧',
  el: '🇬🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹',
} as const;

export const LANGUAGES = {
  en: 'English',
  el: 'Ελληνικά',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
} as const;

export type Languages = keyof typeof LANGUAGES;
