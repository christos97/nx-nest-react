import type { ContentType } from '@ntua-saas-10/shared-consts';

export interface UploadFileSchemaOptions {
  /**
   * The `ContentType` of a file that can be uploaded.
   */
  allowedTypes: ContentType[];
  /**
   * The maximum `size` of the file in bytes.
   * @example 5MB = 5 * 1024 * 1024 = 5242880
   */
  maxFileSize: number;
}
