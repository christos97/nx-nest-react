import type { ThemeOptions } from '@mui/material';
import { colors } from './colors.constants';

export const defaultThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: { main: colors.primary },
  },
};
