/**
 * Typography constants for the application.
 * @fileoverview Typography constants.
 * @global apps/web/~/constants/typography.constants.ts
 */

import type { ThemeOptions } from '@mui/material';

type Typography = ThemeOptions['typography'];

export const typography: Typography = {
  fontFamily: 'Inter, sans-serif',
} as const;

export default typography;
