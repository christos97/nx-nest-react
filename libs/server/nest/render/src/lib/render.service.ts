import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ContentType } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';
import { Canvas } from 'canvas';
import { Chart } from 'chart.js/auto';

import { ContentTypeMapper } from './render.constants';

const { image_svg_xml, application_pdf, image_png, text_html } = ContentType;

@Injectable()
export class RenderService {
  private readonly logger = new Logger(RenderService.name);

  render({ id, chartConfig, options }: Types.RenderParams): Promise<Types.Render> {
    return new Promise((resolve, reject) => {
      const {
        resolution: { width, height },
        contentType,
      } = options;
      const { canvasType, renderType } = ContentTypeMapper[contentType];
      this.logger.log(`Rendering ${renderType} chart with ${canvasType} canvas`);

      try {
        const canvas = new Canvas(width, height, canvasType);
        const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
        new Chart(context, chartConfig);

        const render: Types.Render = {
          id,
          buffer: Buffer.from(''),
          contentType,
          type: renderType,
          createdAt: new Date(),
        };

        switch (contentType) {
          case text_html:
            render.buffer = Buffer.from(`<html>${canvas.toBuffer().toString()}</html>`);
            break;
          case application_pdf:
            render.buffer = canvas.toBuffer(application_pdf);
            break;
          case image_png:
            render.buffer = canvas.toBuffer(image_png);
            break;
          case image_svg_xml:
          default:
            render.buffer = canvas.toBuffer();
            break;
        }
        return resolve(render);
      } catch (error) {
        reject(error);
        this.logger.error(error);
        throw new InternalServerErrorException("Couldn't render chart");
      }
    });
  }
}
