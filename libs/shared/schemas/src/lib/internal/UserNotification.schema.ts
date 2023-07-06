import { z } from 'zod';
import { NotificationType } from '@ntua-saas-10/shared-consts';

/**
 * Schema for validating the structure of a notification object.
 */
const UserNotificationSchema = z.object({
  /**
   * The ID of the chart.
   */
  chartId: z.string(),
  /**
   * The type of the notification.
   */
  type: z.nativeEnum(NotificationType),
  /**
   * The data associated with the notification.
   */
  data: z.object({
    /**
     * The message of the notification.
     */
    title: z.string(),
    /**
     * The message of the notification.
     */
    message: z.string(),
  }),
  /**
   * Whether the notification has been delivered to the user.
   */
  delivered: z.boolean().default(false),
  /**
   * The timestamp when the notification was created.
   */
  createdAt: z.date(),
});

export { UserNotificationSchema };
