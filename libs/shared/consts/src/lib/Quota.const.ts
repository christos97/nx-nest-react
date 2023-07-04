/**
 * @global `@/shared-consts/Quota`
 * @readonly
 */
const Quota = {
  /**
   * Initial credits for new users.
   */
  initialCredits: 500,
  /**
   * Credits removed per chart.
   */
  creditsPerChart: 20,
} as const;

export { Quota };
export type Quota = typeof Quota;
