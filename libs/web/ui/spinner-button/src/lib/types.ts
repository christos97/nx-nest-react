import { UiButtonProps } from '@ntua-saas-10/web/ui/button';

export interface SpinnerButtonProps extends UiButtonProps {
  isLoading: boolean;
  isDone?: boolean;
}
