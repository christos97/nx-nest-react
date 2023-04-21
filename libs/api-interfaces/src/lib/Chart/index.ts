import { Chart, ChartType, LineOptions, ChartData } from 'chart.js';
import { readFileSync } from 'fs';

const file = readFileSync('./random.csv', 'utf8');

const data: ChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

console.log({ file });
