import type { ContentType } from '@ntua-saas-10/shared-consts';
import type { FormEvent } from 'react';

export type FormMetadata = { [key: string]: string | Blob };

export interface UploadWizardProps {
  /**
   * The `path` of the API endpoint repsponsible for the upload action
   */
  path: string;

  /**
   * The `Content-Type` of the upload multipart form
   * @default 'text/plain'
   */
  mimeType?: ContentType;

  /**
   * The `maxFileSize` of the upload multipart form
   * @default 5e6 (5MB)
   */
  maxFileSize?: number;

  /**
   * Key-Value pairs for the FormData append method
   */
  formMetadata: FormMetadata;
}

/**
 * The `FormData` of the upload multipart form
 */
export interface UploadWizardFormData {
  /**
   * The `FileList` of the upload multipart form
   * @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
   */
  files: File[];
}

export interface UploadWizardRef {
  onSubmit: (e: FormEvent) => void;
  files: readonly File[];
  fileId: string | null;
  meta: FormMetadata;
}
