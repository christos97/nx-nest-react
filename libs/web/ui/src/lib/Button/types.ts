import { type MouseEventHandler } from 'react';

export const UiButtonColors = [
  'inherit',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
] as const;
export type UiButtonColor = (typeof UiButtonColors)[number];

export const UiButtonTypes = ['button', 'submit', 'reset'] as const;
export type UiButtonType = (typeof UiButtonTypes)[number];

export interface UiButtonProps {
  text?: string;
  color?: UiButtonColor;
  type?: UiButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
