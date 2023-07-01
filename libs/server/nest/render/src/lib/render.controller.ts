import { Controller, Post, Body, Logger, UsePipes } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RenderService } from './render.service';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import type { Types } from '@ntua-saas-10/shared-types';
import { ContentType } from '@ntua-saas-10/shared-consts';
import { fireAndForget } from '@ntua-saas-10/server/nest/utils';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { RenderChartConfigRequestDto } from '@ntua-saas-10/shared-dtos';
import type { DocumentReference } from 'firebase-admin/firestore';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';

@Controller('render')
export class RenderController {
  private readonly logger: Logger;
  private readonly CHARTS_COLLECTION_PATH: string;
  private readonly RENDERS_PATH: string;

  constructor(
    private readonly renderService: RenderService,
    private readonly configService: ConfigService,
    private readonly datafilesService: DatafilesService,
    private readonly chartConfigService: ChartConfigService,
  ) {
    this.logger = new Logger(RenderController.name);
    this.CHARTS_COLLECTION_PATH = this.configService.getOrThrow('CHARTS_COLLECTION_PATH');
    this.RENDERS_PATH = this.configService.getOrThrow('RENDERS_PATH');
  }

  @Post('render-config')
  @UsePipes(ZodValidationPipe)
  async renderChartConfig(@Body() body: RenderChartConfigRequestDto) {
    const { uid, chartId } = body;

    const chartRef = firestore
      .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
      .doc(chartId) as DocumentReference<Types.Chart>;
    const chartSnapshot = await chartRef.get();
    const chart = chartSnapshot.data() as Types.Chart;

    fireAndForget(async () => {
      const renderParamsArray: Types.RenderParams[] = [
        ContentType.application_pdf,
        ContentType.image_png,
        ContentType.image_svg_xml,
        ContentType.text_html,
      ].map((contentType) => ({
        id: chartId,
        chartConfig: chart.chartConfig,
        options: {
          contentType,
          resolution: {
            width: 1024,
            height: 680,
          },
        },
      }));

      const renders = await Promise.all(
        renderParamsArray.map((params) => this.renderService.render(params)),
      );
      const uploadsMetadata = await Promise.all(
        renders.map((render) =>
          this.datafilesService.uploadRender(
            render.buffer,
            this.RENDERS_PATH,
            `${chartId}.${render.type}`,
            render.contentType,
            {
              chartId,
              chartType: chart.chartType,
              uid,
              createdAt: render.createdAt,
              nextStep: 'notify',
            },
          ),
        ),
      );

      this.logger.log(`Renders for chart ${chartId} uploaded successfully`, { uploadsMetadata });

      await this.chartConfigService.generateChartsMediaLinks(uploadsMetadata);
    });

    return {
      statusCode: 201,
      message: `Chart rendering scheduled`,
    };
  }
}
