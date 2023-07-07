import { Box } from '@mui/material';
import { SignUp } from '@ntua-saas-10/web/features/signup';
import { auth } from '@ntua-saas-10/web/firebase';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (error) return <div>Error: {error.message}</div>;

  if (loading)
    return (
      <Box alignItems="center" justifyContent={'center'} p={24} mt={24}>
        <UiProgressSpinner />
      </Box>
    );

  if (user) return <Navigate to="/" replace />;

  return <SignUp />;
};
