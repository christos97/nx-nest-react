import React from 'react';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import UserInfo from '../../components/UserInfo';
import ChartExamplesCarousel from '../../components/ChartExamplesCarousel';
import ChartPreview from '../../components/ChartPreview';

export const Home: React.FC = () => {
  return (
    <UiCard>
      <ChartExamplesCarousel />
      <h2>My Charts</h2>
      <UserInfo />
      <ChartPreview chartId="44f78c62-ffde-4cfe-b981-4ffec6627d19" uploadedDatafilePath="hh" />
    </UiCard>
  );
};
