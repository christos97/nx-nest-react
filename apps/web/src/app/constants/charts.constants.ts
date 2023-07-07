import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import RadarIcon from '@mui/icons-material/Radar';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import type { ChartConfiguration } from 'chart.js';

export const ChartIcons = {
  line: {
    icon: ShowChartIcon,
    label: 'Line',
  },
  multiAxisLine: {
    icon: SsidChartIcon,
    label: 'Multi Axis Line',
  },
  bubble: {
    icon: BubbleChartIcon,
    label: 'Bubble',
  },
  scatter: {
    icon: ScatterPlotIcon,
    label: 'Scatter',
  },
  radar: {
    icon: RadarIcon,
    label: 'Radar',
  },
  polarArea: {
    icon: PieChartIcon,
    label: 'Polar Area',
  },
};

export const ContentTypeMapping: { [key: string]: string } = {
  'application/pdf': 'PDF',
  'text/html': 'HTML',
  'image/svg+xml': 'SVG',
  'image/png': 'PNG',
};

export const ExampleCharts: {
  chartType: string;
  templateLink: string;
  chartConfig: ChartConfiguration;
}[] = [
  {
    chartType: 'Line',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fline.csv?alt=media&token=7b9be08c-f6ab-4b86-afc8-bcbe2d8514a4',
    chartConfig: {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'dataset-1',
            data: [
              3.14, 1.618, 2.718, 0.866, 1.414, 2.71, 0.577, 1.732, 2.236, 1.732, 0.866, 2.449,
            ],
            backgroundColor: 'rgb(232, 191, 227)',
            borderColor: 'rgb(162, 133, 158)',
          },
          {
            label: 'dataset-2',
            data: [
              2.71, 0.577, 1.414, 1.732, 0.866, 3.14, 1.618, 2.718, 1.732, 2.236, 2.449, 0.866,
            ],
            backgroundColor: 'rgb(207, 186, 179)',
            borderColor: 'rgb(144, 130, 125)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    },
  },
  {
    chartType: 'Multi Axis Line',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fmulti-axis-line.csv?alt=media&token=3fe1b6a1-0ff3-426e-be6a-4c802c95e88c',
    chartConfig: {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Humidity (%)',
            data: [65.5, 62.1, 70.3, 72.7, 78.2, 82.6, 85.1, 82.4, 75.8, 72.3, 68.9, 62.8],
            backgroundColor: 'rgb(231, 171, 251)',
            borderColor: 'rgb(161, 119, 175)',
            yAxisID: 'Humidity (%)',
          },
          {
            label: 'Temperature (°F)',
            data: [38.2, 40.7, 45.9, 55.3, 65.9, 75.4, 80.8, 78.6, 70.1, 60.9, 50.6, 42.4],
            backgroundColor: 'rgb(171, 204, 174)',
            borderColor: 'rgb(119, 142, 121)',
            yAxisID: 'Temperature (°F)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            fullSize: true,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          'Humidity (%)': {
            type: 'linear',
            display: true,
            title: {
              text: 'Humidity (%)',
              display: true,
            },
            position: 'left',
          },
          'Temperature (°F)': {
            type: 'linear',
            display: true,
            title: {
              text: 'Temperature (°F)',
              display: true,
            },
            position: 'right',
          },
        },
      },
    },
  },
  {
    chartType: 'Bubble',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fbubble.csv?alt=media&token=0d597e41-64b2-41a2-a669-75a0e4f03c81',
    chartConfig: {
      type: 'bubble',
      data: {
        labels: [],
        datasets: [
          {
            label: 'dataset-1',
            data: [
              {
                x: 2.3,
                y: 5.7,
                r: 12,
              },
              {
                x: 8.4,
                y: 1.9,
                r: 9,
              },
              {
                x: 9.6,
                y: 4.3,
                r: 11,
              },
              {
                x: 6.9,
                y: 9.4,
                r: 16,
              },
              {
                x: 7.2,
                y: 2.1,
                r: 8,
              },
              {
                x: 5.9,
                y: 8.3,
                r: 14,
              },
              {
                x: 3.5,
                y: 6.1,
                r: 12,
              },
              {
                x: 4.8,
                y: 7.6,
                r: 13,
              },
              {
                x: 1.7,
                y: 9.2,
                r: 15,
              },
              {
                x: 3.9,
                y: 8.6,
                r: 14,
              },
              {
                x: 9.2,
                y: 5.9,
                r: 11,
              },
              {
                x: 5.4,
                y: 3.2,
                r: 7,
              },
            ],
            backgroundColor: 'rgb(189, 208, 196)',
            borderColor: 'rgb(132, 145, 137)',
          },
          {
            label: 'dataset-2',
            data: [
              {
                x: 7.9,
                y: 3.1,
                r: 8,
              },
              {
                x: 6.2,
                y: 2.8,
                r: 13,
              },
              {
                x: 5.8,
                y: 8.1,
                r: 14,
              },
              {
                x: 2.4,
                y: 4.7,
                r: 10,
              },
              {
                x: 3.6,
                y: 6.9,
                r: 15,
              },
              {
                x: 4.7,
                y: 7.2,
                r: 13,
              },
              {
                x: 8.2,
                y: 2.9,
                r: 9,
              },
              {
                x: 9.1,
                y: 5.3,
                r: 17,
              },
              {
                x: 6.4,
                y: 3.3,
                r: 8,
              },
              {
                x: 7.4,
                y: 4.1,
                r: 10,
              },
              {
                x: 1.8,
                y: 7.5,
                r: 13,
              },
              {
                x: 4.9,
                y: 6.7,
                r: 16,
              },
            ],
            backgroundColor: 'rgb(217, 243, 156)',
            borderColor: 'rgb(151, 170, 109)',
          },
          {
            label: 'dataset-3',
            data: [
              {
                x: 4.6,
                y: 9.2,
                r: 15,
              },
              {
                x: 3.7,
                y: 7.5,
                r: 17,
              },
              {
                x: 1.3,
                y: 3.9,
                r: 7,
              },
              {
                x: 8.5,
                y: 5.2,
                r: 13,
              },
              {
                x: 9.3,
                y: 1.8,
                r: 10,
              },
              {
                x: 6.3,
                y: 3.5,
                r: 9,
              },
              {
                x: 1.4,
                y: 4.6,
                r: 11,
              },
              {
                x: 2.7,
                y: 8.8,
                r: 14,
              },
              {
                x: 8.9,
                y: 4.5,
                r: 11,
              },
              {
                x: 2.5,
                y: 6.8,
                r: 16,
              },
              {
                x: 6.6,
                y: 2.7,
                r: 9,
              },
              {
                x: 7.8,
                y: 9.1,
                r: 12,
              },
            ],
            backgroundColor: 'rgb(237, 236, 155)',
            borderColor: 'rgb(165, 165, 108)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    },
  },
  {
    chartType: 'Scatter',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fscatter.csv?alt=media&token=52c5bf46-be66-48f4-8cbd-3a9980a8ebbf',
    chartConfig: {
      type: 'scatter',
      data: {
        labels: [],
        datasets: [
          {
            label: 'dataset-1',
            data: [
              {
                x: 2.3,
                y: 5.7,
              },
              {
                x: 8.4,
                y: 1.9,
              },
              {
                x: 9.6,
                y: 4.3,
              },
              {
                x: 6.9,
                y: 9.4,
              },
              {
                x: 7.2,
                y: 2.1,
              },
              {
                x: 5.9,
                y: 8.3,
              },
              {
                x: 3.5,
                y: 6.1,
              },
              {
                x: 4.8,
                y: 7.6,
              },
              {
                x: 1.7,
                y: 9.2,
              },
              {
                x: 3.9,
                y: 8.6,
              },
              {
                x: 9.2,
                y: 5.9,
              },
              {
                x: 5.4,
                y: 3.2,
              },
            ],
            backgroundColor: 'rgb(235, 229, 243)',
            borderColor: 'rgb(164, 160, 170)',
          },
          {
            label: 'dataset-2',
            data: [
              {
                x: 7.9,
                y: 3.1,
              },
              {
                x: 6.2,
                y: 2.8,
              },
              {
                x: 5.8,
                y: 8.1,
              },
              {
                x: 2.4,
                y: 4.7,
              },
              {
                x: 3.6,
                y: 6.9,
              },
              {
                x: 4.7,
                y: 7.2,
              },
              {
                x: 8.2,
                y: 2.9,
              },
              {
                x: 9.1,
                y: 5.3,
              },
              {
                x: 6.4,
                y: 3.3,
              },
              {
                x: 7.4,
                y: 4.1,
              },
              {
                x: 1.8,
                y: 7.5,
              },
              {
                x: 4.9,
                y: 6.7,
              },
            ],
            backgroundColor: 'rgb(166, 226, 194)',
            borderColor: 'rgb(116, 158, 135)',
          },
          {
            label: 'dataset-3',
            data: [
              {
                x: 4.6,
                y: 9.2,
              },
              {
                x: 3.7,
                y: 7.5,
              },
              {
                x: 1.3,
                y: 3.9,
              },
              {
                x: 8.5,
                y: 5.2,
              },
              {
                x: 9.3,
                y: 1.8,
              },
              {
                x: 6.3,
                y: 3.5,
              },
              {
                x: 1.4,
                y: 4.6,
              },
              {
                x: 2.7,
                y: 8.8,
              },
              {
                x: 8.9,
                y: 4.5,
              },
              {
                x: 2.5,
                y: 6.8,
              },
              {
                x: 6.6,
                y: 2.7,
              },
              {
                x: 7.8,
                y: 9.1,
              },
            ],
            backgroundColor: 'rgb(167, 156, 160)',
            borderColor: 'rgb(116, 109, 112)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    },
  },
  {
    chartType: 'Polar Area',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fpolar-area.csv?alt=media&token=fbc0618d-ef04-45fb-a1dd-25c47b093498',
    chartConfig: {
      type: 'polarArea',
      data: {
        labels: ['Sales', 'Marketing', 'Customer Support', 'Product Development', 'Operations'],
        datasets: [
          {
            label: 'dataset-1',
            data: [4.5, 2.3, 6.8, 3.1, 5.7],
          },
          {
            label: 'dataset-2',
            data: [2.1, 3.7, 1.9, 5.2, 4.6],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    },
  },
  {
    chartType: 'Radar',
    templateLink:
      'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/templates%2Fradar.csv?alt=media&token=b3b47c5b-c720-4c91-ad46-6c75a44bea76',
    chartConfig: {
      type: 'radar',
      data: {
        labels: [
          'Sales',
          'Marketing',
          'Customer Support',
          'Product Development',
          'Operations',
          'Management',
          'Finance',
          'Human Resources',
          'IT Services',
          'Research and Development',
          'Quality Assurance',
          'Supply Chain Management',
        ],
        datasets: [
          {
            label: 'd1',
            data: [
              3.14, 1.618, 2.718, 0.866, 1.414, 2.71, 0.577, 1.732, 2.236, 1.732, 0.866, 2.449,
            ],
          },
          {
            label: 'd2',
            data: [
              2.71, 0.577, 1.414, 1.732, 0.866, 3.14, 1.618, 2.718, 1.732, 2.236, 2.449, 0.866,
            ],
          },
          {
            label: 'd3',
            data: [1.23, 2.34, 0.98, 3.21, 4.56, 3.45, 5.67, 2.12, 1.23, 2.34, 0.98, 3.21],
          },
          {
            label: 'd4',
            data: [4.56, 3.45, 5.67, 2.12, 1.23, 0.98, 2.34, 3.21, 4.56, 3.45, 5.67, 2.12],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Example Radar',
          },
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    },
  },
];
