import styled from '@emotion/styled';
import CircularProgress, { type CircularProgressProps } from '@mui/material/CircularProgress';

const StyledCircularProgress = styled(CircularProgress)({
  color: 'primary',
});

const ProgressSpinner: React.FC<CircularProgressProps> = () => {
  return (
    <div>
      <StyledCircularProgress size={60} thickness={5} />
    </div>
  );
};

export default ProgressSpinner;
