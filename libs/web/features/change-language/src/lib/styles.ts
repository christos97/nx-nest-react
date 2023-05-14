import { colors } from '@mui/material';

export const styles = {
  color: 'black',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  '&:before': {
    borderBottom: `1px solid ${colors.deepPurple[500]}`,
  },
  '&:after': {
    borderBottom: `1px solid ${colors.deepPurple[500]}`,
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: `1px solid transparent`,
  },
} as const;
