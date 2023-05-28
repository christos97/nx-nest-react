import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card, { type CardProps } from '@mui/material/Card';

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: `0px 2px 10px ${theme.palette.grey[400]}`,
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '2rem',
  margin: '1rem',
  border: '1px solid #ddd',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0px 4px 20px ${theme.palette.secondary.main}`,
  },
}));

interface UiCardProps extends CardProps {
  children: React.ReactNode;
}

const UiCard: React.FC<UiCardProps> = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default UiCard;
