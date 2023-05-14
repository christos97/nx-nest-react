import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

const StyledCircularProgress = styled(CircularProgress)({
  color: 'primary',
});

const ProgressSpinner: React.FC = () => {
  return (
    <div>
      <StyledCircularProgress size={60} thickness={5} />
    </div>
  );
};

export default ProgressSpinner;
