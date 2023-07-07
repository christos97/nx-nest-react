import type { ChartData, ChartTypeRegistry, DefaultDataPoint } from 'chart.js';

export type ChartDataType<T extends keyof ChartTypeRegistry> = Omit<
  ChartData<T, DefaultDataPoint<T>, unknown>,
  'xLabels' | 'yLabels'
>;

export type LineChartDataType = ChartDataType<'line'>;
export type BubbleChartDataType = ChartDataType<'bubble'>;
export type RadarChartDataType = ChartDataType<'radar'>;
export type ScatterChartDataType = ChartDataType<'scatter'>;
export type PolarAreaChartDataType = ChartDataType<'polarArea'>;
