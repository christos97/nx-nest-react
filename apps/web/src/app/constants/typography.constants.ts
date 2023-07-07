/**
 * Typography constants for the application.
 * @fileoverview Typography constants.
 * @global apps/web/~/constants/typography.constants.ts
 */

import type { ThemeOptions } from '@mui/material';

import { FONT_FAMILY as fontFamily } from './app.constants';

export const typography: ThemeOptions['typography'] = {
  fontFamily,
  button: {
    textTransform: 'none',
  },
} as const;

export default typography;
