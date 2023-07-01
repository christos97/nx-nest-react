import { z } from 'zod';

/**
 * @constant `RenderChartConfigRequest` ZodSchema
 */
export const RenderChartConfigRequestSchema = z.object({
  chartId: z.string(),
  uid: z.string(),
});
