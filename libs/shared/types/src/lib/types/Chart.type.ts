import type { ChartType, ContentType } from '@ntua-saas-10/shared-consts';
import type { ChartConfiguration } from 'chart.js';
/**
 * @type `Chart` type
 * @description The type of the chart Firestore document
 */
export type Chart = {
  uid: string;
  chartId: string;
  chartTitle: string;
  chartType: ChartType;
  chartConfig: ChartConfiguration;
  uploadedDatafilePath: string;
  createdAt: Date;
  claimed: boolean;
};

export type MediaLink = {
  contentType: ContentType;
  link: string;
};

export type MediaLinks = {
  chartId: string;
  links: MediaLink[];
};
