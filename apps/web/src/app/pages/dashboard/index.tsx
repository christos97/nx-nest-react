import { UiCard } from '@ntua-saas-10/web/ui/card';
import React from 'react';

import { UploadCsvChartFile } from '../../components/UploadCsvChartFile';

export const Dashboard: React.FC = () => {
  return (
    <main>
      <UiCard>
        <UploadCsvChartFile />
      </UiCard>
    </main>
  );
};
