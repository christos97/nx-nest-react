import { Box } from '@mui/material';
import { auth } from '@ntua-saas-10/web/firebase';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { CustomStepper } from '../../components/Stepper';

export const Dashboard: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <Box p={14} m={28} alignItems={'center'} justifyContent={'center'}>
        <UiProgressSpinner />
      </Box>
    );
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <main>
      <UiCard>
        <CustomStepper />
      </UiCard>
    </main>
  );
};
