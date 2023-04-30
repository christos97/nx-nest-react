import { type ThemeOptions } from '@mui/system';
import { colors } from './colors.constants';

const keys = Object.keys(colors) as (keyof typeof colors)[];

export const palette: ThemeOptions['palette'] = keys.reduce((acc, key) => {
  acc[key] = { main: colors[key] };
  return acc;
}, {} as Record<keyof typeof colors, { main: string }>);
