import { createTheme, type Theme } from '@mui/material';

import { Locales, type SupportedLanguages } from '../constants/i18n.constants';
import { theme } from '../constants/theme.constants';

export const localizeTheme = (lng: SupportedLanguages = 'en'): Theme =>
  createTheme(theme, Locales[lng]);
