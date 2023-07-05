import { ChartType } from '@ntua-saas-10/shared-consts';
import { z } from 'zod';

/**
 * @enum `ChartTypeSchema` ZodSchema
 */
export const ChartTypeSchema = z.nativeEnum(ChartType);

/**
 * @constant `DatafileMetadataSchema` ZodSchema
 */
export const DatafileMetadataSchema = z.object({
  chartTitle: z.string(),
  chartId: z.string(),
  chartType: ChartTypeSchema,
  uid: z.string(),
  nextStep: z.enum(['NO_NEXT_STEP', 'validate']),
  contentEncoding: z.literal('UTF-8'),
});

// TODO: Unique declaration of `nextStep` type

/**
 * @constant `UploadDatafileRequestSchema` ZodSchema
 */
export const UploadDatafileRequestSchema = z.object({
  chartTitle: z.string().optional(),
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
 * @constant `DeleteDatafileRequestSchema` ZodSchema
 */
export const DeleteDatafileRequestSchema = z.object({
  uploadedDatafilePath: z.string(),
});

/**
 * @constant `DeleteDatafileResponseSchema` ZodSchema
 */
export const DeleteDatafileResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

/**
 * @constant `ValidateDatafileRequest` ZodSchema
 */
export const ValidateDatafileRequestSchema = z
  .object({
    object: z.object({
      name: z.string(),
      timeCreated: z.string(),
      metadata: DatafileMetadataSchema,
    }),
    context: z.object({}),
  })
  .strict();

/**
 * @constant `ValidateDatafileResponse` ZodSchema
 */
export const ValidateDatafileResponseSchema = z.object({
  statusCode: z.literal(201),
  message: z.string(),
});

export default {
  ChartTypeSchema,
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
  ValidateDatafileRequestSchema,
  ValidateDatafileResponseSchema,
};
