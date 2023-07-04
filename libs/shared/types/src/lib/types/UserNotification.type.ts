import { z } from 'zod';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export type UserNotification = z.infer<typeof Schemas.UserNotificationSchema>;
