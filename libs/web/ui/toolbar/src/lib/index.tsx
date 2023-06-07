import styled from '@emotion/styled';
import { AppBar as MuiAppBar, Toolbar as MuiToolbar } from '@mui/material';

const StyledAppBar = styled(MuiAppBar)`
  background-color: #f8f8f8;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
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
