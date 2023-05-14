import { z } from 'zod';
import type { ContentType } from '../../../types';

interface UploadFileSchemaOptions {
  /**
   * The `ContentType` of a file that can be uploaded.
   */
  allowedTypes: ContentType[];
  /**
   * The maximum size of the file in bytes.
   * @example 5MB = 5 * 1024 * 1024 = 5242880
   */
  maxSize: number;
}

/**
 * The `Zod Schema` of the upload multipart form
 * @param allowedTypes The `ContentType` of a file that can be uploaded.
 * @param maxSize The maximum `size` of the file in bytes.
 * @returns `Zod Schema` of the upload multipart form
 */
const createUploadFileSchema = ({ allowedTypes, maxSize }: UploadFileSchemaOptions) => {
  const types = [...new Set(allowedTypes)];
  const schema = z.object({
    file: z
      .object({
        name: z.string().min(1),
        type: z.string().refine((type) => types.toString().includes(type), {
          message: `Only ${types.toString()} files are allowed`,
        }),
        size: z.number().max(maxSize, { message: `File size must be less than ${maxSize / 1024 / 1024}MB` }),
      })
      .optional(),
  });
  return schema;
};

export default createUploadFileSchema;
