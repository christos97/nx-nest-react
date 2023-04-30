import { Button as MuiButton } from '@mui/material';
import { type UiButtonProps } from './types';
import { styles } from './styles';
import styled from '@emotion/styled';

const StyledButton = styled(MuiButton)(styles);

const Button: React.FC<UiButtonProps> = ({
  text = 'Submit',
  color = 'primary',
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
