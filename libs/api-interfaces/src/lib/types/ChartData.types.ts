import { ChartData, ChartTypeRegistry, DefaultDataPoint } from 'chart.js';

export type ChartDataType<T extends keyof ChartTypeRegistry> = Omit<
  ChartData<T, DefaultDataPoint<T>, unknown>,
  'xLabels' | 'yLabels'
>;

export type LineChartDataType = ChartDataType<'line'>;
export type BubbleChartDataType = ChartDataType<'bubble'>;
export type RadarChartDataType = ChartDataType<'radar'>;
export type ScatterChartDataType = ChartDataType<'scatter'>;

export function isChartData<T extends keyof ChartTypeRegistry>(
  object: any,
): object is ChartDataType<T> {
  return typeof object === 'object' && object !== null;
}
