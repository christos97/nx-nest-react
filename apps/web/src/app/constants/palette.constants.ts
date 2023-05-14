/**
 * Don't edit this file directly.
 * @fileoverview palette constants.
 * @global apps/web/~/constants/palette.constants.ts
 */

import { type ThemeOptions } from '@mui/system';
import { colors } from './colors.constants';

const keys = Object.keys(colors) as Colors[];
export type Colors = keyof typeof colors;

export const palette: ThemeOptions['palette'] = keys.reduce((acc, key) => {
  acc[key] = { main: colors[key] };
  return acc;
}, {} as Record<Colors, { main: string }>);
