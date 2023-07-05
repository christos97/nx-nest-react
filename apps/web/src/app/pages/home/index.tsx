import React from 'react';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import UserInfo from '../../components/UserInfo';
import ChartExamplesCarousel from '../../components/ChartExamplesCarousel';
import ChartPreview from '../../components/ChartPreview';
import ChartsTable from '../../components/ChartsTable';

export const Home: React.FC = () => {
  return (
    <UiCard>
      <ChartExamplesCarousel />
      <h2>My Charts</h2>
      <UserInfo />
      {/*<ChartPreview chartId="d7fa5b4d-432f-4869-b46b-6a1a5810a3a4" uploadedDatafilePath="hh" />*/}
      <ChartsTable />
    </UiCard>
  );
};
