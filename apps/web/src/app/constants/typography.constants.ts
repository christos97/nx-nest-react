import { ThemeOptions } from '@mui/material';

type Typography = ThemeOptions['typography'];

export const typography: Typography = {
  fontFamily: 'Inter, sans-serif',
} as const;

export default typography;
