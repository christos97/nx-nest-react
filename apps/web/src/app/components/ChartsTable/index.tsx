import { Button, Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type { Types } from '@ntua-saas-10/shared-types';
import { auth } from '@ntua-saas-10/web/firebase';
import { useFsCol } from '@ntua-saas-10/web/hooks';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { ChartIcons, ContentTypeMapping } from '../../constants/charts.constants';
import ChartPreview from '../ChartPreview';

export const ChartsTable: React.FC = () => {
  const [user] = useAuthState(auth);
  const [charts, chartsLoading] = useFsCol<Types.Chart>(`users/${user?.uid}/charts`);
  const [mediaLinks, mediaLinksLoading, mediaLinksError] = useFsCol<Types.MediaLinks>(
    `users/${user?.uid}/mediaLinks`,
  );

  const [chartId, setChartId] = useState<string | null>(null);

  if (!user) return <></>;

  const rows =
    charts
      ?.filter((chart) => chart.claimed)
      ?.map((chart) => ({
        chart: ChartIcons[chart.chartType].icon,
        chartTitle: chart.chartTitle,
        id: chart.chartId,
        chartType: ChartIcons[chart.chartType].label,
        createdAt: (chart.createdAt as unknown as Timestamp).toDate().toLocaleString(),
        links: mediaLinks?.filter((link) => link.chartId === chart.chartId)[0]?.links || [],
      })) ?? [];

  const columns: GridColDef[] = [
    {
      field: 'chart',
      headerName: 'Chart',
      flex: 0.3,
      renderCell: (params) => {
        const Icon = params.value;
        return <Icon color="primary" />;
      },
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'chartTitle', headerName: 'Title', flex: 1 },
    { field: 'chartType', headerName: 'Chart Type', flex: 0.5 },
    { field: 'createdAt', headerName: 'Date Created', flex: 0.8 },
    {
      field: 'links',
      headerName: 'Links',
      flex: 1.3,
      renderCell: (params) => {
        const mediaLinks = params.value;
        return (
          <Box sx={{ display: 'flex', gap: '.5rem' }}>
            {mediaLinksLoading ? (
              <CircularProgress size={14} color="primary" />
            ) : (
              (mediaLinks || []).map((linkItem: Types.MediaLink) => (
                <Button
                  key={linkItem.contentType}
                  variant="contained"
                  href={linkItem.link}
                  size="small"
                >
                  {ContentTypeMapping[linkItem.contentType] || linkItem.contentType}
                </Button>
              ))
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: '100%', marginBottom: '100px' }}>
        <h2>My Charts</h2>
        <DataGrid
          loading={chartsLoading}
          rows={rows}
          columns={columns}
          autoPageSize
          onCellClick={(e) => {
            setChartId(e.row.id);
          }}
        />
      </div>
      {chartId && <ChartPreview hideActionButtons chartId={chartId} uploadedDatafilePath="" />}
    </>
  );
};
