import { UiCard } from '@ntua-saas-10/web/ui/card';

import { ChartExamplesCarousel } from '../../components/ChartExamplesCarousel';
import { ChartsTable } from '../../components/ChartsTable';

export const Home: React.FC = () => {
  return (
    <UiCard>
      <ChartsTable />
      <ChartExamplesCarousel />
    </UiCard>
  );
};
