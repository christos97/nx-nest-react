import { BadRequestException } from '@nestjs/common';
import { ParseResult } from 'papaparse';
import { ChartDataType } from '@ntua-saas-10/api-interfaces';
import { generatePalette } from './generate-palette.util';
export const transformDataToLine = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<ChartDataType<'line'>> = {
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
        const { primaryColor, secondaryColor } = generatePalette();

        currentDataset = {
          label: key,
          data: [],
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
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
    if (transformedData.datasets[datasetIndex].data.length !== transformedData.labels.length) {
      throw new BadRequestException('Some rows contain missing values');
    }
  }

  return transformedData;
};

export const transformDataToBubble = (parsedFile: ParseResult<any>) => {
  const transformedData: Required<ChartDataType<'bubble'>> = {
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
      const match = tuple.match(/\((\d+(\.\d+)?)\$(\d+(\.\d+)?)\$(\d+(\.\d+)?)\)/);

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
  const transformedData: Required<ChartDataType<'scatter'>> = {
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
      const match = pair.match(/\((\d+(\.\d+)?)\$(\d+(\.\d+)?)\)/);
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
  const transformedData: Required<ChartDataType<'polarArea'>> = {
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
          backgroundColor: [],
        };

        transformedData.datasets.push(currentDataset);
      }
      if (!currentDataset.backgroundColor) currentDataset.backgroundColor = [];

      const parsedValue = Number.parseFloat(row[key]);
      if (Number.isNaN(parsedValue)) {
        throw new BadRequestException('Datafile contains invalid values');
      }

      currentDataset.data.push(parsedValue);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentDataset.backgroundColor.push(generatePalette().primaryColor);
    }
  }

  for (const datasetIndex in transformedData.datasets) {
    if (transformedData.datasets[datasetIndex].data.length !== transformedData.labels.length) {
      throw new BadRequestException('Some rows contain missing values');
    }
  }

  return transformedData;
};
