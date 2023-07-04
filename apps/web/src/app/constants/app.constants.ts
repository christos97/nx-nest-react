/**
 * This file contains the constants used in the app.
 * @fileoverview App constants.
 * @global apps/web/~/constants/app.constants.ts
 */

/**
 * @constant `APP_TITLE`
 * @example 'My Charts'
 */
export const APP_TITLE = 'My Charts';

/**
 * @constant `LOGO_SRC`
 * @example `CDN_URL`
 */
export const LOGO_SRC =
  'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/public%2Flogo.jpg?alt=media&token=60daf16d-8e03-4773-8d24-bef9b1c059fa';
export const LOGO_ALT = 'My Charts Logo';
export const LOGO_WIDTH = 45;
export const LOGO_HEIGHT = 45;

/**
 * @constant `FONT_FAMILY`
 * @example 'Inter, sans-serif'
 */
export const FONT_FAMILY = 'Inter, sans-serif';

/**
 * @constant `MUI_COLOR_NAME`
 * @example 'purple'
 */
export const MUI_COLOR_NAME = 'purple';
/**
 * @constant `HeaderProps`
 */
export const HeaderProps = {
  brand: APP_TITLE,
  src: LOGO_SRC,
  alt: LOGO_ALT,
  width: LOGO_WIDTH,
  height: LOGO_HEIGHT,
} as const;
/**
 * @constant `MAX_FILE_SIZE_MB`
 * @example 5 * 1024 * 1024 = 5242880 bytes = 5MB
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
