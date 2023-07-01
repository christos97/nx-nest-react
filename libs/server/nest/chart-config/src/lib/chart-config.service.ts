import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import type { Types } from '@ntua-saas-10/shared-types';
import type { DocumentReference } from 'firebase-admin/firestore';
import { firestore, storage } from '@ntua-saas-10/server-firebase-admin';

@Injectable()
export class ChartConfigService {
  private readonly CHARTS_COLLECTION_PATH: string;

  constructor(private configService: ConfigService) {
    this.CHARTS_COLLECTION_PATH = this.configService.getOrThrow('CHARTS_COLLECTION_PATH');
  }

  generateChartConfig(chartType: Types.ChartType, data: ChartData): ChartConfiguration {
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
    chartConfig.options = {
      ...chartConfig.options,
      interaction: { mode: 'index', intersect: false },
      scales: {},
    };

    let leftAxisExists = false;
    for (const dataset of data.datasets as ChartDataset<'line'>[]) {
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
      chartType: Types.ChartType;
      createdAt: Date;
      uploadedDatafilePath: string;
      claimed?: boolean;
    },
  ) {
    const { chartConfig, chartId, chartType, createdAt, uploadedDatafilePath, claimed } = chart;

    try {
      const chartRef = firestore
        .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
        .doc(chartId) as DocumentReference<Types.Chart>;

      await chartRef.set({
        chartId,
        chartType,
        createdAt,
        chartConfig,
        uploadedDatafilePath,
        claimed: claimed ?? false,
      });
    } catch {
      throw new InternalServerErrorException('Chart configuration could not be saved');
    }
  }

  async deleteChartConfig(uid: string, chartId: string) {
    try {
      const chartRef = firestore
        .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
        .doc(chartId) as DocumentReference<Types.Chart>;

      await chartRef.delete();
    } catch {
      throw new InternalServerErrorException('Chart configuration could not be deleted');
    }
  }

  async generateChartsMediaLinks(uploadsMetadata: any[]) {
    const mediaLinks = [];
    const { uid, chartId } = uploadsMetadata[0].metadata;

    for (const upload of uploadsMetadata) {
      const fileRef = storage.bucket().file(upload.name);
      const downloadLink = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });

      mediaLinks.push({ contentType: upload.contentType, link: downloadLink[0] });
    }

    const chartRef = firestore
      .collection(this.CHARTS_COLLECTION_PATH.replace('{uid}', uid))
      .doc(chartId) as DocumentReference<Types.Chart>;

    await chartRef.set({ mediaLinks }, { merge: true });
  }
}
