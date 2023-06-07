/**
 * Typography constants for the application.
 * @fileoverview Typography constants.
 * @global apps/web/~/constants/typography.constants.ts
 */

import type { ThemeOptions } from '@mui/material';
import { FONT_FAMILY } from './app.constants';

type Typography = ThemeOptions['typography'];

export const typography: Typography = {
  fontFamily: FONT_FAMILY,
} as const;

export default typography;
