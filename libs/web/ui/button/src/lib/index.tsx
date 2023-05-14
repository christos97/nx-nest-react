import type { UiButtonProps } from './types';
import { styles } from './styles';
import { Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';

const StyledButton = styled(MuiButton)(styles);

const Button: React.FC<UiButtonProps> = ({
  children,
  disabled = false,
  color = 'primary',
  type = 'button',
  variant = 'contained',
  onClick,
}) => {
  return (
    <StyledButton variant={variant} disabled={disabled} type={type} color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export * from './types';
export default Button;
