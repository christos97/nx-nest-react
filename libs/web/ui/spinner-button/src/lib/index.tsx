import { Check } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { UiButton } from '@ntua-saas-10/web/ui/button';

import type { SpinnerButtonProps } from './types';

type ButtonColorState = 'primary' | 'success' | 'inherit';

const getButtonState = (
  isLoading: boolean,
  isDone: boolean,
  isDisabled: boolean,
  children: React.ReactNode,
) => {
  const buttonColor: ButtonColorState = isDone
    ? 'success'
    : isLoading || isDisabled
    ? 'inherit'
    : 'primary';

  const buttonContent: React.ReactNode = isDone ? (
    <>
      <Check sx={{ fontSize: 18, marginRight: 1 }} />
      {children}
    </>
  ) : isLoading ? (
    <CircularProgress size={24} />
  ) : (
    children
  );

  return { buttonColor, buttonContent };
};

const SpinnerButton: React.FC<SpinnerButtonProps> = ({ isLoading, isDone, ...props }) => {
  const { buttonColor, buttonContent } = getButtonState(
    isLoading,
    !!isDone,
    !!props.disabled,
    props.children,
  );
  const neutralize = isLoading || !!props.disabled;
  return (
    <UiButton
      {...props}
      color={buttonColor}
      variant={neutralize ? 'text' : 'contained'}
      disabled={neutralize}
    >
      {buttonContent}
    </UiButton>
  );
};

export default SpinnerButton;
