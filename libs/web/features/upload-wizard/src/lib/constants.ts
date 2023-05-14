import type { HookFieldProps } from '@ntua-saas-10/web/features/hook-field';

/**
 * The `ContentType` of a file that can be uploaded.
 */
export const ContentType = {
  /**
   * `Generic` Content Type.
   */
  multipart_form_data: 'multipart/form-data',
  /**
   * Supported.
   */
  text_plain: 'text/plain',
  /**
   * Supported.
   */
  text_csv: 'text/csv',
  /**
   * Supported.
   */
  text_html: 'text/html',
  /**
   * Supported.
   */
  application_json: 'application/json',
  /**
   * `NOT` Supported.
   */
  application_xml: 'application/xml',
  /**
   * Supported.
   */
  application_octet_stream: 'application/octet-stream',
  /**
   * Supported.
   */
  image_png: 'image/png',
  /**
   * Supported.
   */
  image_jpeg: 'image/jpeg',
  /**
   * `NOT` Supported.
   */
  image_gif: 'image/gif',
  /**
   * `NOT` Supported.
   */
  video_mp4: 'video/mp4',
  /**
   * `NOT` Supported.
   */
  audio_mp3: 'audio/mp3',
} as const;

export const httpConfig = {
  headers: {
    'Content-Type': ContentType.multipart_form_data,
  },
} as const;

const type = 'file';
export const fileField: HookFieldProps = {
  type,
  id: type,
  name: type,
  label: 'File Upload',
  required: true,
  placeholder: '',
  validation: {
    required: 'REQUIRED_TEXT',
  },
  props: {
    required: true,
  },
  errors: {
    required: 'ERROR_TEXT',
  },
};
