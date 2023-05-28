/**
 * This file contains the constants used in the app.
 * @fileoverview App constants.
 * @global apps/web/~/constants/app.constants.ts
 */

export const APP_TITLE = 'My Charts';
export const LOGO_SRC =
  'https://firebasestorage.googleapis.com/v0/b/lesi-charts.appspot.com/o/public%2Flogo.jpg?alt=media&token=60daf16d-8e03-4773-8d24-bef9b1c059fa';
export const LOGO_ALT = 'My Charts Logo';
export const LOGO_WIDTH = 45;
export const LOGO_HEIGHT = 45;

/**
 * @constant `HeaderProps`
 */
export const HeaderProps = {
  brand: APP_TITLE,
  src: LOGO_SRC,
  alt: LOGO_ALT,
  width: LOGO_WIDTH,
  height: LOGO_HEIGHT,
};
/**
 * @constant `MAX_FILE_SIZE_MB`
 * @example 5 * 1024 * 1024 = 5242880 bytes = 5MB
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
