import { Injectable } from '@nestjs/common';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ChartType } from '@ntua-saas-10/api-interfaces';

@Injectable()
export class ChartConfigService {
  generateChartConfig(chartType: ChartType, data: ChartData): ChartConfiguration {
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
      chartConfig.options = {
        ...chartConfig.options,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      };
    } else {
      chartConfig.type = chartType;
    }

    return chartConfig;
  }
}
