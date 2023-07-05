import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Post, Body, Logger, UsePipes } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { fireAndForget } from '@ntua-saas-10/server/nest/utils';
import { firestore } from '@ntua-saas-10/server-firebase-admin';

import { RenderChartConfigRequestDto } from '@ntua-saas-10/shared-dtos';
import type { Types } from '@ntua-saas-10/shared-types';
import type { DocumentReference } from 'firebase-admin/firestore';

import { renderMapperConfig } from './render.constants';
import { RenderService } from './render.service';

import { CollectionsPaths } from '@ntua-saas-10/shared-consts';
import { StoragePaths } from '@ntua-saas-10/shared-consts';

@Controller('render')
export class RenderController {
  private readonly logger: Logger;
  constructor(
    private readonly renderService: RenderService,
    private readonly datafilesService: DatafilesService,
    private readonly chartConfigService: ChartConfigService,
  ) {
    this.logger = new Logger(RenderController.name);
  }

  @Post('render-config')
  @UsePipes(ZodValidationPipe)
  async renderChartConfig(@Body() body: RenderChartConfigRequestDto) {
    const { uid, chartId } = body;

    const chartRef = firestore
      .collection(CollectionsPaths.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
      .doc(chartId) as DocumentReference<Types.Chart>;
    const chartSnapshot = await chartRef.get();
    const { chartType, chartConfig } = chartSnapshot.data() as Types.Chart;

    fireAndForget(async () => {
      const renderParamsArray: Types.RenderParams[] = renderMapperConfig.map(({ contentType }) => ({
        id: chartId,
        chartConfig: chartConfig,
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
        renders.map(({ buffer, type, contentType, createdAt }) =>
          this.datafilesService.uploadRender(
            buffer,
            StoragePaths.RENDERS_DESTINATION,
            `${chartId}.${type}`,
            contentType,
            {
              uid,
              chartId,
              chartType,
              createdAt,
              nextStep: 'NO_NEXT_STEP',
            },
          ),
        ),
      );

      await this.chartConfigService.saveChartsMediaLinks(uploadsMetadata);
    });

    return {
      statusCode: 201,
      message: `Chart rendering scheduled`,
    };
  }
}
