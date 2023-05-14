import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(to right, #f1c40f, #e74c3c)',
}));

const StyledTypography = styled(Typography)({
  color: '#fff',
  textAlign: 'center',
  textShadow: '1px 1px #000',
});

const StyledSpan = styled.span(({ theme }) => ({
  fontSize: '5rem',
  color: 'primary',
}));

const StyledImg = styled.img(({ theme }) => ({
  width: '200px',
  marginLeft: '20px',
}));

const NotFound: React.FC = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h2">
        Oops! The page you are looking for cannot be found.
        <br />
        <StyledSpan>404</StyledSpan>
        <StyledImg src="/path/to/image.png" />
      </StyledTypography>
    </StyledBox>
  );
};

export default NotFound;
