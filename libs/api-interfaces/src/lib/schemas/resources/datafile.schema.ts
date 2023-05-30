import { z } from 'zod';
/**
 * @enum `ChartTypeSchema` ZodSchema
 */
export const ChartTypeSchema = z.enum(['bar', 'multi-axis', 'pie']);

/**
 * @constant `UploadDatafileRequestSchema` ZodSchema
 */
export const UploadDatafileRequestSchema = z.object({
  chartType: ChartTypeSchema,
  fileId: z.string().optional(),
  filename: z.string().optional(),
  datafile: z.any(),
});

/**
 * @constant `UploadDatafileResponseSchema` ZodSchema
 */
export const UploadDatafileResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  file: z.object({
    id: z.string(),
    uid: z.string(),
    name: z.string(),
    url: z.string().url(),
    meta: z.object({
      chartType: ChartTypeSchema,
      createdAt: z.date(),
    }),
  }),
});

export default {
  ChartTypeSchema,
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
};
