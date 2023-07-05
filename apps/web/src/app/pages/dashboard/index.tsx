import { UiCard } from '@ntua-saas-10/web/ui/card';
import React from 'react';

import { UploadCsvChartFile } from '../../components/UploadCsvChartFile';
import ChartsTable from '../../components/ChartsTable';
import BuyCreditsDialog from '../../components/BuyCreditsForm';

export const Dashboard: React.FC = () => {
  return (
    <main>
      <UiCard>
        <ChartsTable />
        <UploadCsvChartFile />
      </UiCard>
    </main>
  );
};
