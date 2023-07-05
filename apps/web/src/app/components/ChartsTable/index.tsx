import { FC, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { useFsCol } from '@ntua-saas-10/web/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@ntua-saas-10/web/firebase';
import type { Types } from '@ntua-saas-10/shared-types';
import { Timestamp } from 'firebase/firestore';

import ChartPreview from '../ChartPreview';
import { ChartIcons, ContentTypeMapping } from '../../constants/charts.constants';

const ChartsTable: FC = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [charts, chartsLoading, chartsError] = useFsCol<Types.Chart>(`users/${user?.uid}/charts`);

  const [chartId, setChartId] = useState<string | null>(null);

  const rows: GridRowsProp[] =
    charts
      ?.filter((chart) => chart.claimed)
      .map((chart) => ({
        chart: ChartIcons[chart.chartType].icon,
        chartTitle: chart.chartTitle,
        id: chart.chartId,
        chartType: ChartIcons[chart.chartType].label,
        createdAt: (chart.createdAt as unknown as Timestamp).toDate().toLocaleString(),
        links: chart.mediaLinks,
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
            {mediaLinks.map((linkItem) => (
              <Button
                key={linkItem.contentType}
                variant="contained"
                href={linkItem.link}
                size="small"
              >
                {ContentTypeMapping[linkItem.contentType] || linkItem.contentType}
              </Button>
            ))}
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
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

export default ChartsTable;
