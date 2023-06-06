import { Body, Controller, InternalServerErrorException, Post, UsePipes } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { DatafilesService } from '@ntua-saas-10/nest-resources/datafiles';
import { type ChartConfiguration } from 'chart.js';
import { ChartConfigService } from '@ntua-saas-10/nest-resources/chart-config';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ValidateDatafileRequestDto } from '@ntua-saas-10/api-interfaces';

@Controller('validation')
export class ValidationController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly datafilesService: DatafilesService,
    private readonly chartConfigService: ChartConfigService,
  ) {}

  @Post('validate')
  @UsePipes(ZodValidationPipe)
  async validateDatafile(
    @Body()
    body: ValidateDatafileRequestDto,
  ): Promise<ChartConfiguration> {
    const chartType = body.object.metadata.chartType;

    const fileBuffer = await this.datafilesService.streamFromStorage(body.object.name);
    const parsedFile = this.datafilesService.parseCsv(fileBuffer);
    const validatedData = this.validationService.validateDatafile(parsedFile, chartType);
    return this.chartConfigService.generateChartConfig(chartType, validatedData);
  }
}
