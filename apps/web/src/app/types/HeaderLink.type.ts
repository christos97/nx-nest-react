import type { MouseEventHandler } from 'react';

export type HeaderLink = {
  label: string;
  path: string;
  isButton?: boolean;
  handler?: () => MouseEventHandler<HTMLButtonElement>;
};
