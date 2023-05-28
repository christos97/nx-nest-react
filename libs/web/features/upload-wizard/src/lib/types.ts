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
   * Key-Value pairs for the FormData append method
   */
  formMetadata?: Record<string, unknown>;
}

/**
 * The `FormData` of the upload multipart form
 */
export interface UploadWizardFormData {
  /**
   * The `FileList` of the upload multipart form
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
   * @see https://developer.mozilla.org/en-US/docs/Web/API/File
   */
  file: FileList;
}
