import { Button as MuiButton } from '@mui/material';
import { UiButtonProps } from './types';
import { styles } from './styles';
import styled from '@emotion/styled';

const StyledButton = styled(MuiButton)(styles);

const Button: React.FC<UiButtonProps> = ({ text, color, onClick }) => {
  return (
    <StyledButton color={color} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
