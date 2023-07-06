import React from 'react';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import UserInfo from '../../components/UserInfo';
import ChartExamplesCarousel from '../../components/ChartExamplesCarousel';
import ChartPreview from '../../components/ChartPreview';
import ChartsTable from '../../components/ChartsTable';

export const Home: React.FC = () => {
  return (
    <UiCard>
      <UserInfo />
      <h2>My Charts</h2>

      <ChartsTable />

      <ChartExamplesCarousel />
    </UiCard>
  );
};
