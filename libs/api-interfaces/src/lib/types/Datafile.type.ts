import type { z } from 'zod';
import {
  UploadDatafileRequestSchema,
  UploadDatafileResponseSchema,
} from '../schemas/resources/datafile.schema';

export type UploadDatafileRequest = z.infer<typeof UploadDatafileRequestSchema>;
export type UploadDatafileResponse = z.infer<typeof UploadDatafileResponseSchema>;
