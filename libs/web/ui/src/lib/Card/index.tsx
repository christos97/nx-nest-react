import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  backgroundColor: '#f7f7f7',
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0px 5px 15px ${theme.palette.grey[900]}`,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  margin: '1rem',
  border: '1px solid black',
}));

interface UiCardProps extends CardProps {
  children: React.ReactNode;
}

const UiCard: React.FC<UiCardProps> = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default UiCard;
