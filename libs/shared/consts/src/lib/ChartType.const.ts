/**
 * @global `@/shared-consts/ChartType`
 * @readonly
 */
const ChartType = {
  line: 'line',
  multiAxisLine: 'multiAxisLine',
  radar: 'radar',
  scatter: 'scatter',
  bubble: 'bubble',
  polarArea: 'polarArea',
} as const;

export { ChartType };
export type ChartType = (typeof ChartType)[keyof typeof ChartType];
