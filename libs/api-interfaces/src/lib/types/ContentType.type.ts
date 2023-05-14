import { ContentType } from '../consts';

/**
 * The `ContentType` of a file that can be uploaded.
 */
export type ContentType = (typeof ContentType)[keyof typeof ContentType];
