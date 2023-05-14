import { ContentType } from '@ntua-saas-10/api-interfaces';
import type { ZodRawShape, z } from 'zod';

export interface UploadWizardProps<T extends ZodRawShape> {
  /**
   * The `path` of the API endpoint repsponsible for the upload action
   */
  path: string;

  /**
   * The `Zod Schema` of the upload multipart form
   */
  schema: z.ZodObject<T>;

  /**
   * The `ContentType` / `mimeType` of a file to be uploaded
   */
  mimeType: ContentType;

  /**
   * The `metadata` of the file to be uploaded
   */
  metadata: Record<string, string>;
}
