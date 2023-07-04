import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Render, RenderParams } from '@ntua-saas-10/shared-types';
import { Canvas } from 'canvas';
import { Chart } from 'chart.js/auto';

import { ContentTypeMapper } from './render.constants';

@Injectable()
export class RenderService {
  private readonly logger!: Logger;

  constructor() {
    if (!this.logger) {
      this.logger = new Logger(RenderService.name);
    }
  }

  async render({ options, chartConfig, id }: RenderParams): Promise<Render> {
    return new Promise<Render>((resolve, reject) => {
      const {
        resolution: { width, height },
        contentType,
      } = options;

      const { canvasType, renderType } = ContentTypeMapper[contentType];
      const canvas = new Canvas(width, height, canvasType);
      const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const __chart = new Chart(context, chartConfig);
      canvas.toBuffer((err: Error | null, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          const render: Render = {
            id,
            buffer,
            contentType,
            type: renderType,
            createdAt: new Date(),
          };
          if (contentType === 'text/html') {
            render.buffer = Buffer.from(`<html>${buffer.toString()}</html>`);
          }
          this.logger.log({ render });
          resolve(render);
        }
      });
    });
  }
}
