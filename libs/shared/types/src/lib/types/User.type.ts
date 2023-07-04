import type { ResourcesSchemas } from '@ntua-saas-10/shared-schemas';
import type { z } from 'zod';

/**
 * @type `User`
 * @description The user from firebase plus extra data
 */
export type User = z.infer<(typeof ResourcesSchemas)['users']['retrieve']>;
