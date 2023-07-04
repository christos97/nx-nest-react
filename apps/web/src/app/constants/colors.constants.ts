/**
 * Append to colors object to add new colors.
 * @fileoverview Colors constants.
 * @global apps/web/~/constants/colors.constants.ts
 */

import { colors as MuiColors } from '@mui/material';

import { MUI_COLOR_NAME } from './app.constants';

const PRIMARY = 500;
const SECONDARY = 200;

export const colors = {
  primary: MuiColors[MUI_COLOR_NAME][PRIMARY],
  secondary: MuiColors[MUI_COLOR_NAME][SECONDARY],
} as const;

export type AppColors = typeof colors;
export default colors;
