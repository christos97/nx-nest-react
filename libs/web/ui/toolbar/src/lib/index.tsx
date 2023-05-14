import styled from '@emotion/styled';
import { AppBar as MuiAppBar, Toolbar as MuiToolbar } from '@mui/material';

const StyledAppBar = styled(MuiAppBar)`
  background-color: #ffffff;
  color: #333333;
`;

const StyledToolbar = styled(MuiToolbar)`
  padding: 0;
  min-height: 48px;
`;

interface ToolbarProps {
  children: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({ children }) => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <StyledToolbar>{children}</StyledToolbar>
    </StyledAppBar>
  );
};

export default Toolbar;
