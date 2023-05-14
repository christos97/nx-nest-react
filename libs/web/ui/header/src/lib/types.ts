export interface UiHeaderProps {
  children?: React.ReactNode;
  links: { label: string; path: string }[];
  brand: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}
