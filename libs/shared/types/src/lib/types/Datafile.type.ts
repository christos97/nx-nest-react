import type { Schemas } from '@ntua-saas-10/shared-schemas';
import type { z } from 'zod';

export type UploadDatafileRequest = z.infer<
  (typeof Schemas.ResourcesSchemas)['datafiles']['create']
>;
export type UploadDatafileResponse = z.infer<typeof Schemas.UploadDatafileResponseSchema>;

export type DatafileMetadata = z.infer<typeof Schemas.DatafileMetadataSchema>;
