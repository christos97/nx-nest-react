/**
 * Append to colors object to add new colors.
 * @fileoverview Colors constants.
 * @global apps/web/~/constants/colors.constants.ts
 */

import { colors as MuiColors } from '@mui/material';

const { purple } = MuiColors;

export const colors = {
  primary: purple[500],
  secondary: purple[100],
} as const;
