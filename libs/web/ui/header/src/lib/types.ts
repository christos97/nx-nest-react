import type { MouseEventHandler } from 'react';

export interface UiHeaderProps {
  children?: React.ReactNode;
  links: {
    label: string;
    path: string;
    isButton?: boolean;
    handler?: () => MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
  brand: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
