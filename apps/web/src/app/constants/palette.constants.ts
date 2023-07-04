/**
 * Don't edit this file directly.
 * @fileoverview palette constants.
 * @global apps/web/~/constants/palette.constants.ts
 */

import { type ThemeOptions } from '@mui/system';

import { colors, type AppColors } from './colors.constants';

export type Color = keyof typeof colors;
const keys = Object.keys(colors) as Color[];

export const palette: ThemeOptions['palette'] = keys.reduce((acc, key) => {
  acc[key] = { main: colors[key] as AppColors[Color] };
  return acc;
}, {} as Record<Color, { main: string }>);

export default palette;
