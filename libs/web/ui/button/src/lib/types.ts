import type { MouseEventHandler } from 'react';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import type { UiButtonColor, UiButtonType } from './consts';

export type UiButtonType = (typeof UiButtonType)[number];
export type UiButtonColor = (typeof UiButtonColor)[keyof typeof UiButtonColor];
export interface UiButtonProps extends Omit<MuiButtonProps, 'color' | 'type' | 'variant'> {
  children?: React.ReactNode;
  color?: UiButtonColor;
  type?: UiButtonType;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
