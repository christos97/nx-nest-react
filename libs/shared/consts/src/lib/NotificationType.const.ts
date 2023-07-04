/**
 * Constants for notification types.
 * @global
 * @readonly
 * @namespace NotificationType
 */
const NotificationType = {
  /**
   * Indicates a success notification.
   */
  success: 'success',
  /**
   * Indicates an error notification.
   */
  error: 'error',
  /**
   * Indicates an informational notification.
   */
  info: 'info',
  /**
   * Indicates a warning notification.
   */
  warning: 'warning',
} as const;

/**
 * Export the NotificationType constant assertion.
 * @typedef {keyof typeof NotificationType} NotificationType
 */
export { NotificationType };
export type NotificationType = keyof typeof NotificationType;
