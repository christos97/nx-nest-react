/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common';
import { DatafileValuesRegex, ChartType } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';
import { ParseResult } from 'papaparse';

import { generatePalette } from './generate-palette.util';

export const transformDataToLine = (parsedFile: ParseResult<any>, isMultiAxis = false) => {
  const transformedData: Required<Types.ChartDataType<'line'>> = {
    labels: [],
    datasets: [],
  };

  if (!parsedFile.data[0].labels) throw new BadRequestException('Labels column is missing');

  if (Object.keys(parsedFile.data[0]).length > 3) {
    throw new BadRequestException(
      'Only three columns (labels, dataset-1, dataset-2) are allowed for multi axis line chart',
    );
  }

  for (const row of parsedFile.data) {
    transformedData.labels.push(row.labels);

    for (const key in row) {
      if (key === 'labels') continue;

      let currentDataset = transformedData.datasets.find((dataset) => dataset.label === key);
      if (!currentDataset) {
        const { primaryColor, secondaryColor } = generatePalette();

        currentDataset = {
          label: key,
          data: [],
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
          ...(isMultiAxis ? { yAxisID: key } : {}),
        };
        transformedData.datasets.push(currentDataset);
      }

      const parsedValue = Number.parseFloat(row[key]);
      if (Number.isNaN(parsedValue)) {
        throw new BadRequestException('Datafile contains invalid values');
      }
      currentDataset.data.push(parsedValue);
    }
  }

  for (const datasetIndex in transformedData.datasets) {
    if (transformedData?.datasets?.[datasetIndex]?.data?.length !== transformedData.labels.length) {
      throw new BadRequestException('Some rows contain missing values');
    }
  }

  return transformedData;
};

export const transformDataToBubble = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<Types.ChartDataType<'bubble'>> = {
    labels: [],
    datasets: [],
  };

  for (const row of parsedFile.data) {
    for (const key in row) {
      let currentDataset = transformedData.datasets.find((dataset) => dataset.label === key);
      if (!currentDataset) {
        const { primaryColor, secondaryColor } = generatePalette();

        currentDataset = {
          label: key,
          data: [],
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
        };
        transformedData.datasets.push(currentDataset);
      }

      const tuple = row[key];
      const match = tuple.match(DatafileValuesRegex.bubble);

      if (!match) {
        throw new BadRequestException("Datafile values don't match bubble format");
      }

      const x = parseFloat(match[1]);
      const y = parseFloat(match[3]);
      const r = parseFloat(match[5]);

      currentDataset.data.push({ x, y, r });
    }
  }

  return transformedData;
};

export const transformDataToScatter = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<Types.ChartDataType<'scatter'>> = {
    labels: [],
    datasets: [],
  };

  for (const row of parsedFile.data) {
    for (const key in row) {
      let currentDataset = transformedData.datasets.find((dataset) => dataset.label === key);
      if (!currentDataset) {
        const { primaryColor, secondaryColor } = generatePalette();

        currentDataset = {
          label: key,
          data: [],
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
        };
        transformedData.datasets.push(currentDataset);
      }

      const pair = row[key];
      const match = pair.match(DatafileValuesRegex.scatter);
      if (!match) {
        throw new BadRequestException("Datafile values don't match scatter format");
      }

      const x = parseFloat(match[1]);
      const y = parseFloat(match[3]);

      currentDataset.data.push({ x, y });
    }
  }

  return transformedData;
};

export const transformDataToPolarArea = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<Types.ChartDataType<'polarArea'>> = {
    labels: [],
    datasets: [],
  };

  if (!parsedFile.data[0].labels) throw new BadRequestException('Labels column is missing');

  for (const row of parsedFile.data) {
    transformedData.labels.push(row.labels);

    for (const key in row) {
      if (key === 'labels') continue;

      let currentDataset = transformedData.datasets.find((dataset) => dataset.label === key);
      if (!currentDataset) {
        currentDataset = {
          label: key,
          data: [],
        };

        transformedData.datasets.push(currentDataset);
      }

      const parsedValue = Number.parseFloat(row[key]);
      if (Number.isNaN(parsedValue)) {
        throw new BadRequestException('Datafile contains invalid values');
      }

      currentDataset.data.push(parsedValue);
    }
  }

  for (const datasetIndex in transformedData.datasets) {
    if (transformedData?.datasets?.[datasetIndex]?.data?.length !== transformedData.labels.length) {
      throw new BadRequestException('Some rows contain missing values');
    }
  }

  return transformedData;
};

export const transformDataToRadar = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<Types.ChartDataType<'line'>> = {
    labels: [],
    datasets: [],
  };

  if (!parsedFile.data[0].labels) throw new BadRequestException('Labels column is missing');

  for (const row of parsedFile.data) {
    transformedData.labels.push(row.labels);

    for (const key in row) {
      if (key === 'labels') continue;

      let currentDataset = transformedData.datasets.find((dataset) => dataset.label === key);
      if (!currentDataset) {
        currentDataset = {
          label: key,
          data: [],
        };
        transformedData.datasets.push(currentDataset);
      }

      const parsedValue = Number.parseFloat(row[key]);
      if (Number.isNaN(parsedValue)) {
        throw new BadRequestException('Datafile contains invalid values');
      }
      currentDataset.data.push(parsedValue);
    }
  }

  for (const datasetIndex in transformedData.datasets) {
    if (transformedData?.datasets?.[datasetIndex]?.data?.length !== transformedData.labels.length) {
      throw new BadRequestException('Some rows contain missing values');
    }
  }

  return transformedData;
};

export const TransformMapper = {
  [ChartType.line]: transformDataToLine,
  [ChartType.radar]: transformDataToRadar,
  [ChartType.scatter]: transformDataToScatter,
  [ChartType.bubble]: transformDataToBubble,
  [ChartType.polarArea]: transformDataToPolarArea,
} as const;
