import { Box, Button, Paper, Typography } from '@mui/material';
import { Chart } from 'react-chartjs-2';
import Carousel from 'react-material-ui-carousel';

import { ExampleCharts } from '../../constants/charts.constants';

export const ChartExamplesCarousel: React.FC = () => {
  return (
    <Carousel
      autoPlay
      indicators
      swipe
      cycleNavigation
      navButtonsAlwaysVisible
      fullHeightHover
      animation={'slide'}
      sx={{ width: '100%' }}
    >
      {ExampleCharts.map((chart, index) => {
        const { chartConfig, chartType } = chart;

        return (
          <Paper
            key={chartType}
            sx={{
              padding: '1rem',
              height: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{chartType}</Typography>
            <Box
              sx={{
                width: '100%',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Chart
                type={chartConfig.type}
                data={chartConfig.data}
                options={chartConfig.options}
                plugins={chartConfig.plugins}
              />
              <Button href={chart.templateLink}>Get CSV Template</Button>
            </Box>
          </Paper>
        );
      })}
    </Carousel>
  );
};
