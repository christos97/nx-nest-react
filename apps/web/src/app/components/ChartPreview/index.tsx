import type { FC } from 'react';
import { type ChartConfiguration, Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import { auth, firestore } from '@ntua-saas-10/web/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, Query, query, where } from 'firebase/firestore';
import type { Types } from '@ntua-saas-10/shared-types';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ToastMessage } from '@ntua-saas-10/web/ui/toast';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';

export interface ChartPreviewProps {
  chartId: string;
  uploadedDatafilePath: string;
  hideActionButtons?: boolean;
}

export type ChartPreviewActions = 'abort' | 'verify';

const ChartPreview: FC<ChartPreviewProps> = ({
  chartId,
  uploadedDatafilePath,
  hideActionButtons = false,
}) => {
  ChartJS.register();
  const [chartConfig, setChartConfig] = useState<ChartConfiguration | null>(null);
  const [user] = useAuthState(auth);
  const axios = useAxios({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selection, setSelection] = useState<ChartPreviewActions | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelection = async (action: ChartPreviewActions) => {
    setSelection(action);

    try {
      setLoading(true);
      const response = await axios.post(`/transaction/${action}`, {
        chartId,
        uploadedDatafilePath,
      });

      toast(<ToastMessage title={response?.data?.message ?? 'OK'} />, {
        type: action === 'verify' ? 'success' : 'info',
      });

      if (action === 'abort') {
        setErrorMessage('Your chart has been discarded');
      }
    } catch (e) {
      const error = e as AxiosError;

      toast(<ToastMessage title={error?.response?.data?.message ?? ''} />, {
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chartRef = doc(firestore, `users/${user?.uid}/charts/${chartId}`);
    const notificationsRef = collection(firestore, `users/${user?.uid}/notifications`);

    const notificationsQuery: Query<Types.Notification> = query(
      notificationsRef,
      where('chartId', '==', chartId),
    );

    const unsubscribeChart = onSnapshot(chartRef, (snapshot) => {
      if (snapshot.exists()) {
        const configData = snapshot.data() as Types.Chart;
        setChartConfig(configData.chartConfig);
      } else {
        setChartConfig(null);
      }
    });

    const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const notification = change.doc.data() as Types.Notification;
          if (notification.type === 'error' || notification.type === 'info') {
            console.log(notification);
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
  if (!chartConfig || loading) return <UiProgressSpinner />;

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
            isLoading={selection === 'abort' && loading}
            onClick={() => handleSelection('abort')}
            color="secondary"
          >
            Abort
            <SentimentVeryDissatisfiedIcon sx={{ paddingLeft: '5px' }} />
          </UiSpinnerButton>
          <UiSpinnerButton
            disabled={!!selection}
            isLoading={selection === 'verify' && loading}
            onClick={() => handleSelection('verify')}
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

export default ChartPreview;
