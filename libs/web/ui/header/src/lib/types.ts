import type { HeaderLink } from '@ntua-saas-10/api-interfaces';

export interface UiHeaderProps {
  children?: React.ReactNode;
  links: HeaderLink[];
  brand: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
