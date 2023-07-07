import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import type { Types } from '@ntua-saas-10/shared-types';
import { auth, firestore } from '@ntua-saas-10/web/firebase';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';
import { ToastMessage } from '@ntua-saas-10/web/ui/toast';
import { AxiosError } from 'axios';
import { type ChartConfiguration, Chart as ChartJS } from 'chart.js/auto';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

export interface ChartPreviewProps {
  chartId: string;
  uploadedDatafilePath: string;
  hideActionButtons?: boolean;
}

const ChartPreviewActions = {
  Abort: 'abort',
  Verify: 'verify',
} as const;

type ChartPreviewActions = (typeof ChartPreviewActions)[keyof typeof ChartPreviewActions];

export const ChartPreview: FC<ChartPreviewProps> = ({
  chartId,
  uploadedDatafilePath,
  hideActionButtons = false,
}) => {
  ChartJS.register();
  const [chartConfig, setChartConfig] = useState<ChartConfiguration | null>(null);
  const [user] = useAuthState(auth);
  const axios = useAxios({});
  const [selection, setSelection] = useState<ChartPreviewActions | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelection = async (action: ChartPreviewActions) => {
    setSelection(action);

    try {
      setLoading(true);
      const response = await axios.post(`/transaction/${action}`, {
        chartId,
        uploadedDatafilePath,
      });

      toast(<ToastMessage title={response?.data?.message || 'OK'} />, {
        type: action === ChartPreviewActions.Verify ? 'success' : 'info',
      });

      if (action === ChartPreviewActions.Abort) {
        setErrorMessage('Your chart has been discarded');
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      toast(<ToastMessage title={error?.response?.data?.message ?? ''} />, {
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chartRef = doc(
      firestore,
      `users/${user?.uid}/charts/${chartId}`,
    ) as DocumentReference<Types.Chart>;
    const notificationsRef = collection(
      firestore,
      `users/${user?.uid}/notifications`,
    ) as CollectionReference<Types.UserNotification>;

    const notificationsQuery = query(notificationsRef, where('chartId', '==', chartId));

    const unsubscribeChart = onSnapshot(chartRef, (snapshot) => {
      if (snapshot.exists()) {
        const configData = snapshot.data();
        setChartConfig(configData.chartConfig);
      } else {
        setChartConfig(null);
      }
    });

    const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const notification = change.doc.data();
          if (notification.type === 'error' || notification.type === 'info') {
            setErrorMessage(notification.data.message);
          }
        }
      });
    });

    return () => {
      unsubscribeChart();
      unsubscribeNotifications();
    };
  }, [user, chartId]);

  if (errorMessage)
    return (
      <Typography sx={{ marginTop: '10px' }} variant="body1">
        {errorMessage}
      </Typography>
    ); // Render the error message
  if (!chartConfig) return <UiProgressSpinner />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box sx={{ width: '100%', height: '600px', display: 'flex', justifyContent: 'center' }}>
        <Chart
          type={chartConfig.type}
          data={chartConfig.data}
          options={chartConfig.options}
          plugins={chartConfig.plugins}
        />
      </Box>
      {!hideActionButtons && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '2rem' }}>
          <UiSpinnerButton
            disabled={!!selection}
            isLoading={selection === ChartPreviewActions.Abort && loading}
            onClick={() => handleSelection(ChartPreviewActions.Abort)}
            color="secondary"
          >
            Abort
            <SentimentVeryDissatisfiedIcon sx={{ paddingLeft: '5px' }} />
          </UiSpinnerButton>
          <UiSpinnerButton
            disabled={!!selection}
            isLoading={selection === ChartPreviewActions.Verify && loading}
            onClick={() => handleSelection(ChartPreviewActions.Verify)}
            color="primary"
          >
            Verify
            <ShoppingCartIcon sx={{ paddingLeft: '5px' }} />
          </UiSpinnerButton>
        </Box>
      )}
    </Box>
  );
};
