import { createTheme, type Theme } from '@mui/material';
import { defaultThemeOptions } from '../constants/theme.constants';
import { Locales, type SupportedLanguages } from '../constants/i18n.constants';

export const localizeTheme = (lng: SupportedLanguages = 'en'): Theme =>
  createTheme(defaultThemeOptions, Locales[lng]);
