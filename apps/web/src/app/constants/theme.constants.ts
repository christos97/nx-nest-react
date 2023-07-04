/**
 * Only append to theme object from other files.
 * @fileoverview i18n constants.
 * @global apps/web/~/constants/theme.constants.ts
 */

import type { ThemeOptions } from '@mui/material';

import { palette } from './palette.constants';
import { typography } from './typography.constants';

export const theme: ThemeOptions = {
  typography,
  palette,
} as const;

export default theme;
