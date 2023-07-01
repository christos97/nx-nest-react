import { Injectable, NotImplementedException } from '@nestjs/common';
import { Chart } from 'chart.js/auto';
import { Canvas } from 'canvas';
import { ContentType } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';

@Injectable()
export class RenderService {
  render(params: Types.RenderParams): Promise<Types.Render> {
    return new Promise((resolve, reject) => {
      const { chartConfig } = params;
      const { contentType } = params.options;
      const { width, height } = params.options.resolution;

      if (
        contentType !== ContentType.application_pdf &&
        contentType !== ContentType.image_svg_xml &&
        contentType !== ContentType.image_png &&
        contentType !== ContentType.text_html
      ) {
        reject(new NotImplementedException('Unsupported content type'));
        return;
      }

      let type: 'svg' | 'pdf' | 'png' = 'svg';

      if (contentType === ContentType.application_pdf) type = 'pdf';
      else if (contentType === ContentType.image_png) type = 'png';

      // @ts-ignore
      const canvas = new Canvas(width, height, type);
      const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
      const chartRef = new Chart(context, chartConfig);

      // Special case if `contentType` is `text/html`
      if (contentType === ContentType.text_html) {
        const svgBuffer = canvas.toBuffer();
        const htmlBuffer = Buffer.from(`<html>${svgBuffer.toString()}</html>`);
        resolve({
          id: params.id,
          buffer: htmlBuffer,
          contentType,
          type: 'html',
          createdAt: new Date(),
        });
      } else {
        // @ts-ignore
        const buffer = canvas.toBuffer(contentType);
        resolve({
          id: params.id,
          buffer,
          contentType,
          type,
          createdAt: new Date(),
        });
      }
    });
  }
}
