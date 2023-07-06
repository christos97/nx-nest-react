import React, { FC, useEffect, useState } from 'react';
import { auth, firestore } from '@ntua-saas-10/web/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { Box, Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';
import { Types } from '@ntua-saas-10/shared-types';
import SavingsIcon from '@mui/icons-material/Savings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { UiButton } from '@ntua-saas-10/web/ui/button';
import BuyCreditsDialog from '../BuyCreditsForm';

const UserInfo: FC = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [chartsCount, setChartsCount] = useState<number>(null);
  const [userDoc, setUserDoc] = useState<Types.User>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBuyCreditsClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const chartsRef = collection(firestore, `users/${user?.uid}/charts`);
      const userRef = doc(firestore, `users/${user?.uid}`);

      const unsubscribeCharts = onSnapshot(
        query(chartsRef, where('claimed', '==', true)),
        (snapshot) => {
          const totalCount = snapshot.size;
          setChartsCount(totalCount);
        },
      );

      const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data() as Types.User;
        setUserDoc(userData);
      });

      return () => {
        unsubscribeCharts();
        unsubscribeUser();
      };
    };

    fetchUserInfo();
  }, [user]);

  if (!user) return <p>Login to see user information</p>;

  return (
    <>
      <h1>
        Welcome back, {user.displayName || user.email} <RocketLaunchIcon />
      </h1>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem' }}>
        <Paper
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem' }}
        >
          <Box>
            <h3>Available Credits</h3>
            <SavingsIcon />
            <h4>{userDoc?.customClaims?.quota?.current ?? '...'}</h4>
          </Box>
        </Paper>

        <Paper
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem' }}
        >
          <Box>
            <h3>Created Charts</h3>
            <ShowChartIcon />
            <h4>{chartsCount ?? '...'}</h4>
          </Box>
        </Paper>
      </Box>

      <UiButton
        onClick={() => {
          handleBuyCreditsClick();
        }}
      >
        Buy Credits
      </UiButton>

      {userDoc && (
        <Dialog
          open={openDialog}
          onBackdropClick={() => {
            setOpenDialog(false);
          }}
        >
          <DialogTitle>Buy Credits</DialogTitle>
          <DialogContent>
            <BuyCreditsDialog uid={userDoc.uid} setOpenDialog={setOpenDialog} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UserInfo;
