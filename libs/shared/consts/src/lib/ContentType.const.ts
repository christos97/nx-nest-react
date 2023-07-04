/**
 * @global `@/shared-consts/ContentType`
 * @readonly
 */
const ContentType = {
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
  application_pdf: 'application/pdf',

  /**
   * Supported.
   */
  image_png: 'image/png',
  /**
   * `NOT` Supported.
   */
  image_jpeg: 'image/jpeg',
  /**
   * Supported.
   */
  image_svg_xml: 'image/svg+xml',
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

export { ContentType };
export type ContentType = (typeof ContentType)[keyof typeof ContentType];
