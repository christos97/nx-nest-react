import type { ChartType } from './ChartType.type';
import type { ChartConfiguration } from 'chart.js';
import type { ContentType } from '@ntua-saas-10/shared-consts';
/**
 * @type `Chart` type
 * @description The type of the chart Firestore document
 */
export type Chart = {
  chartId: string;
  chartType: ChartType;
  chartConfig: ChartConfiguration;
  uploadedDatafilePath: string;
  createdAt: Date;
  claimed: boolean;
  mediaLinks?: {
    contentType: ContentType;
    link: string;
  }[];
};
