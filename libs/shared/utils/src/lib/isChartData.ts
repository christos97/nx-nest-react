import type { Types } from '@ntua-saas-10/shared-types';
import type { ChartTypeRegistry } from 'chart.js';

export default function isChartData<T extends keyof ChartTypeRegistry>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
): object is Types.ChartDataType<T> {
  return typeof object === 'object' && object !== null;
}
