import type { z } from 'zod';
import { ChartTypeSchema } from '../schemas/resources/datafile.schema';

/**
 * @type `ChartType` type
 * @description The type of chart to be rendered
 * @example 'bar'
 */
export type ChartType = z.infer<typeof ChartTypeSchema>;
