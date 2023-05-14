import type { z } from 'zod';
import { ResourcesSchemas } from '../schemas';

/**
 * @type `User`
 * @description The user from firebase plus extra data
 */
export type User = z.infer<(typeof ResourcesSchemas)['users']>;
