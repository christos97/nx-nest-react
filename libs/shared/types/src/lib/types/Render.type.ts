import type { ChartType } from '@ntua-saas-10/shared-consts';
import type { ChartConfiguration } from 'chart.js';

/**
 * Represents the parameters required for rendering a chart.
 */
export interface RenderParams {
  /**
   * The ID of the render.
   */
  id: string;
  /**
   * The configuration object for the chart.
   */
  chartConfig: ChartConfiguration;
  /**
   * The options for rendering the chart.
   */
  options: {
    /**
     * The content type of the rendered chart.
     */
    contentType: 'image/svg+xml' | 'image/png' | 'application/pdf' | 'text/html';
    /**
     * The resolution of the rendered chart.
     */
    resolution: {
      /**
       * The width of the rendered chart.
       */
      width: number;
      /**
       * The height of the rendered chart.
       */
      height: number;
    };
  };
}

/**
 * Represents the result of a chart rendering operation.
 */
export interface Render {
  /**
   * The ID of the render.
   */
  id: string;
  /**
   * The buffer containing the rendered chart data.
   */
  buffer: Buffer;
  /**
   * The content type of the rendered chart.
   */
  contentType: RenderParams['options']['contentType'];
  /**
   * The type of the rendered chart.
   */
  type: 'svg' | 'pdf' | 'png' | 'html';
  /**
   * The timestamp when the rendering was created.
   */
  createdAt: Date;
}

/**
 * Represents metadata associated with a rendered chart.
 */
export interface RenderMetadata {
  /**
   * The ID of the chart.
   */
  chartId: string;
  /**
   * The ID of the user who owns the chart.
   */
  uid: string;
  /**
   * The type of the chart.
   */
  chartType: ChartType;
  /**
   * The timestamp when the rendering was created.
   */
  createdAt: Date;
  /**
   * The timestamp when the rendering was created.
   */
  nextStep: 'NO_NEXT_STEP';
}
