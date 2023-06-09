import { z } from 'zod';
import { ChartType } from '@ntua-saas-10/shared-consts';

/**
 * @enum `ChartTypeSchema` ZodSchema
 */
export const ChartTypeSchema = z.nativeEnum(ChartType);

/**
 * @constant `DatafileMetadataSchema` ZodSchema
 */
export const DatafileMetadataSchema = z.object({
  chartType: ChartTypeSchema,
  uid: z.string(),
  nextStep: z.enum(['NO_NEXT_STEP', 'validate']),
  contentEncoding: z.enum(['UTF-8']),
});

// TODO: Unique declaration of `nextStep` type

/**
 * @constant `UploadDatafileRequestSchema` ZodSchema
 */
export const UploadDatafileRequestSchema = z.object({
  chartType: ChartTypeSchema,
  fileId: z.string().optional(), // remove
  filename: z.string().optional(), // remove
  datafile: z.any(), // type this (instanceof File or smth)
});

/**
 * @constant `UploadDatafileResponseSchema` ZodSchema
 */
export const UploadDatafileResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  file: z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url(),
    meta: z.object({
      chartType: ChartTypeSchema,
      createdAt: z.date(),
      uid: z.string(),
    }),
  }),
});

/**
 * @constant `ValidateDatafileRequest` ZodSchema
 */
export const ValidateDatafileRequestSchema = z.object({
  object: z.object({ name: z.string(), metadata: DatafileMetadataSchema }),
  context: z.object({}),
});

export default {
  ChartTypeSchema,
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
  ValidateDatafileRequestSchema,
};
