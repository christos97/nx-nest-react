import type { z } from 'zod';
import { ServicesSchemas } from '../schemas';

/**
 * @type `User`
 * @description The user from firebase plus extra data
 */
export type I18nTranslationKeys = z.infer<(typeof ServicesSchemas)['I18nStreamSchema']>;
