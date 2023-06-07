import type { Types } from '@ntua-saas-10/shared-types';
import { z } from 'zod';

/**
 * The `Zod Schema` of the upload multipart form
 * @param allowedTypes The `ContentType` of a file that can be uploaded.
 * @param maxSize The maximum `size` of the file in bytes.
 * @returns `Zod Schema` of the upload multipart form
 */
const createUploadFileSchema = ({ allowedTypes, maxSize }: Types.UploadFileSchemaOptions) => {
  const types = [...new Set(allowedTypes)];
  const schema = z.object({
    name: z.string().min(1),
    type: z.string().refine((type) => types.toString().includes(type), {
      message: `Only ${types.toString().replace(',', ' | ')} files are allowed`,
    }),
    size: z
      .number()
      .max(maxSize, { message: `File size must be less than ${maxSize / 1024 / 1024}MB` }),
  });
  return schema;
};

export default createUploadFileSchema;
