import { Button as MuiButton } from '@mui/material';
import { UiButtonProps } from './types';
import { styles } from './styles';
import styled from '@emotion/styled';

const StyledButton = styled(MuiButton)(styles);

const Button: React.FC<UiButtonProps> = ({
  text,
  color,
  type = 'button',
  onClick,
}) => {
  return (
    <StyledButton type={type} color={color} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
