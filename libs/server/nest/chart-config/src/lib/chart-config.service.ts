import { Injectable } from '@nestjs/common';
import type { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import type { Types } from '@ntua-saas-10/shared-types';

@Injectable()
export class ChartConfigService {
  generateChartConfig(chartType: Types.ChartType, data: ChartData): ChartConfiguration {
    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: new Date().toLocaleString(),
          },
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    };

    if (chartType === 'multiAxisLine') {
      this.generateMultiAxisLineOptions(chartConfig, data);
    } else {
      chartConfig.type = chartType;
    }

    return chartConfig;
  }

  private generateMultiAxisLineOptions(chartConfig: ChartConfiguration, data: ChartData) {
    chartConfig.options = {
      ...chartConfig.options,
      interaction: { mode: 'index', intersect: false },
      scales: {},
    };

    let leftAxisExists = false;
    for (const dataset of data.datasets as ChartDataset<'line'>[]) {
      const { yAxisID = 'Untitled' } = dataset;

      if (chartConfig.options.scales) {
        chartConfig.options.scales[yAxisID] = {
          type: 'linear',
          display: true,
          title: {
            text: yAxisID,
            display: true,
          },
          position: leftAxisExists ? 'right' : 'left',
        };
      }

      leftAxisExists = true;
    }
  }
}
