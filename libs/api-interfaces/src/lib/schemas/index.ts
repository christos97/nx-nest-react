export { default as ResourcesSchemas } from '../schemas/resources';
export { default as ServicesSchemas } from '../schemas/services';

/**
 * @description Internal Schemas - (not exposed to the API)
 */
export { default as UserQuotaSchema } from '../schemas/quotas';

/**
 * @description Web Schemas - (exposed to the API)
 */
export { default as createUploadFileSchema } from './web/upload-file';
