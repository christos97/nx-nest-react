import type { Schemas } from '@ntua-saas-10/shared-schemas';
import type { z } from 'zod';

/**
 * @type `ChartType` type
 * @description The type of chart to be rendered
 * @example 'bar'
 */
export type ChartType = z.infer<
  (typeof Schemas.ResourcesSchemas)['datafiles']['create']['shape']['chartType']
>;
