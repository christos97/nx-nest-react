import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { ParseResult } from 'papaparse';
import type { Types } from '@ntua-saas-10/shared-types';
import {
  transformDataToLine,
  transformDataToBubble,
  transformDataToScatter,
  transformDataToPolarArea,
  transformDataToRadar,
} from '@ntua-saas-10/server/nest/utils';
import { Utils } from '@ntua-saas-10/shared-utils';

const { isChartData } = Utils;

@Injectable()
export class ValidationService {
  validateDatafile(parsedFile: ParseResult<unknown>, chartType: Types.ChartType) {
    if (chartType === 'line') return this.validateLine(parsedFile);
    if (chartType === 'multiAxisLine') return this.validateMultiAxisLine(parsedFile);
    if (chartType === 'radar') return this.validateRadar(parsedFile);
    if (chartType === 'scatter') return this.validateScatter(parsedFile);
    if (chartType === 'bubble') return this.validateBubble(parsedFile);
    if (chartType === 'polarArea') return this.validatePolarArea(parsedFile);

    throw new NotImplementedException('Cannot validate datafile against the specified chart type');
  }

  private validateLine(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToLine(parsedFile);

    if (!isChartData<'line'>(transformedData)) {
      throw new BadRequestException(`Data don't match line chart type`);
    }

    return transformedData;
  }

  private validateMultiAxisLine(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToLine(parsedFile, true);

    if (!isChartData<'line'>(transformedData)) {
      throw new BadRequestException(`Data don't match multi axis line chart type`);
    }

    return transformedData;
  }

  private validateScatter(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToScatter(parsedFile);

    if (!isChartData<'scatter'>(transformedData)) {
      throw new BadRequestException(`Data don't match scatter chart type`);
    }

    return transformedData;
  }

  private validateBubble(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToBubble(parsedFile);

    if (!isChartData<'bubble'>(transformedData)) {
      throw new BadRequestException(`Data don't match bubble chart type`);
    }

    return transformedData;
  }

  private validatePolarArea(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToPolarArea(parsedFile);

    if (!isChartData<'polarArea'>(transformedData)) {
      throw new BadRequestException(`Data don't match polar area chart type`);
    }

    return transformedData;
  }

  private validateRadar(parsedFile: ParseResult<unknown>) {
    const transformedData = transformDataToRadar(parsedFile);

    if (!isChartData<'radar'>(transformedData)) {
      throw new BadRequestException(`Data don't match radar chart type`);
    }

    return transformedData;
  }
}
