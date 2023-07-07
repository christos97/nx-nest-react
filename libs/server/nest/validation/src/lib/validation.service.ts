import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { TransformMapper } from '@ntua-saas-10/server/nest/utils';
import type { ChartType } from '@ntua-saas-10/shared-consts';
import { isChartData } from '@ntua-saas-10/shared-utils';
import { ParseResult } from 'papaparse';

@Injectable()
export class ValidationService {
  validateDatafile(parsedFile: ParseResult<unknown>, chartType: ChartType) {
    switch (chartType) {
      case 'line':
      case 'multiAxisLine':
        return this.validateLine(parsedFile, chartType === 'multiAxisLine');
      case 'scatter':
        return this.validateScatter(parsedFile);
      case 'bubble':
        return this.validateBubble(parsedFile);
      case 'polarArea':
        return this.validatePolarArea(parsedFile);
      case 'radar':
        return this.validateRadar(parsedFile);
      default:
        break;
    }
    throw new NotImplementedException('Cannot validate datafile against the specified chart type');
  }

  private validateLine(parsedFile: ParseResult<unknown>, isMultiAxis = false) {
    const transformedData = TransformMapper['line'](parsedFile, isMultiAxis);

    if (!isChartData<'line'>(transformedData)) {
      throw new BadRequestException(`Data don't match line chart type`);
    }

    return transformedData;
  }

  private validateScatter(parsedFile: ParseResult<unknown>) {
    const transformedData = TransformMapper['scatter'](parsedFile);

    if (!isChartData<'scatter'>(transformedData)) {
      throw new BadRequestException(`Data don't match scatter chart type`);
    }

    return transformedData;
  }

  private validateBubble(parsedFile: ParseResult<unknown>) {
    const transformedData = TransformMapper['bubble'](parsedFile);
    if (!isChartData<'bubble'>(transformedData)) {
      throw new BadRequestException(`Data don't match bubble chart type`);
    }

    return transformedData;
  }

  private validatePolarArea(parsedFile: ParseResult<unknown>) {
    const transformedData = TransformMapper['polarArea'](parsedFile);

    if (!isChartData<'polarArea'>(transformedData)) {
      throw new BadRequestException(`Data don't match polar area chart type`);
    }

    return transformedData;
  }

  private validateRadar(parsedFile: ParseResult<unknown>) {
    const transformedData = TransformMapper['radar'](parsedFile);

    if (!isChartData<'radar'>(transformedData)) {
      throw new BadRequestException(`Data don't match radar chart type`);
    }

    return transformedData;
  }
}
