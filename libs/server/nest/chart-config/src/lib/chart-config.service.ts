import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firestore, storage } from '@ntua-saas-10/server-firebase-admin';

import type { ChartType, ContentType } from '@ntua-saas-10/shared-consts';
import type { Chart } from '@ntua-saas-10/shared-types';
import type { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import type { DocumentReference } from 'firebase-admin/firestore';

type UploadChartConfig = {
  metadata: {
    uid: string;
    chartId: string;
  };
  name: string;
  contentType: ContentType;
};
type LineChartDataset = ChartDataset<(typeof ChartType)['line']>;

@Injectable()
export class ChartConfigService {
  private readonly CHARTS_COLLECTION_PATH: string;

  constructor(private configService: ConfigService) {
    this.CHARTS_COLLECTION_PATH = this.configService.getOrThrow('CHARTS_COLLECTION_PATH');
  }

  generateChartConfig(chartType: ChartType, data: ChartData): ChartConfiguration {
    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: new Date().toLocaleString(),
          },
          legend: {
            display: true,
            fullSize: true,
          },
        },
      },
    };

    if (chartType === 'multiAxisLine') {
      this.generateMultiAxisLineOptions(chartConfig, data);
    } else {
      chartConfig.type = chartType;
    }

    return chartConfig;
  }

  private generateMultiAxisLineOptions(chartConfig: ChartConfiguration, data: ChartData) {
    if (!chartConfig.options || Object.keys(chartConfig.options || {}).length === 0)
      chartConfig.options = {};
    chartConfig.options.interaction = { mode: 'index', intersect: false };
    chartConfig.options.scales = {};

    let leftAxisExists = false;
    for (const dataset of data.datasets as LineChartDataset[]) {
      const { yAxisID = 'Untitled' } = dataset;

      if (chartConfig.options.scales) {
        chartConfig.options.scales[yAxisID] = {
          type: 'linear',
          display: true,
          title: {
            text: yAxisID,
            display: true,
          },
          position: leftAxisExists ? 'right' : 'left',
        };
      }

      leftAxisExists = true;
    }
  }

  async saveChartConfig(
    uid: string,
    chart: {
      chartConfig: ChartConfiguration;
      chartId: string;
      chartType: ChartType;
      createdAt: Date;
      uploadedDatafilePath: string;
      claimed?: boolean;
    },
  ) {
    try {
      const chartRef = firestore
        .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
        .doc(chart.chartId) as DocumentReference<Chart>;

      await chartRef.set({
        ...chart,
        uid,
        claimed: !!chart.claimed,
      });
    } catch {
      throw new InternalServerErrorException('Chart configuration could not be saved');
    }
  }

  async deleteChartConfig(uid: string, chartId: string) {
    try {
      const chartRef = firestore
        .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
        .doc(chartId) as DocumentReference<Chart>;

      await chartRef.delete();
    } catch {
      throw new BadRequestException('Chart configuration could not be deleted');
    }
  }

  async generateChartsMediaLinks(uploadsMetadata: UploadChartConfig[] = []) {
    const mediaLinks = [];
    const metadata = uploadsMetadata[0]?.metadata;
    if (!metadata) throw new InternalServerErrorException('No uploads metadata');

    const { uid, chartId } = metadata as UploadChartConfig['metadata'];
    for (const { name, contentType } of uploadsMetadata) {
      const fileRef = storage.bucket().file(name);
      const downloadLink = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
      mediaLinks.push({ contentType, link: downloadLink[0] });
    }

    const chartRef = firestore
      .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
      .doc(chartId) as DocumentReference<Chart>;

    await chartRef.set({ mediaLinks }, { merge: true });
  }
}
