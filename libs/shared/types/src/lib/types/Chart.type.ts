import type { ChartType } from './ChartType.type';
import type { ChartConfiguration } from 'chart.js';
/**
 * @type `Chart` type
 * @description The type of the chart Firestore document
 */
export type Chart = {
  chartType: ChartType;
  createdAt: Date;
  chartConfig: ChartConfiguration;
};
