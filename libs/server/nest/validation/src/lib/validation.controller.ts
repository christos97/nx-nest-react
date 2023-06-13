import { Body, Controller, Post, UsePipes, Logger } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ValidateDatafileRequestDto, ValidateDatafileResponseDto } from '@ntua-saas-10/shared-dtos';
import { fireAndForget } from '@ntua-saas-10/server/nest/utils';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import { TransactionService } from '@ntua-saas-10/server/nest/transaction';

@Controller('validation')
export class ValidationController {
  private readonly logger = new Logger(ValidationController.name);
  constructor(
    private readonly validationService: ValidationService,
    private readonly datafilesService: DatafilesService,
    private readonly chartConfigService: ChartConfigService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('validate-csv')
  @UsePipes(ZodValidationPipe)
  async validateDatafile(
    @Body()
    body: ValidateDatafileRequestDto,
  ): Promise<ValidateDatafileResponseDto> {
    fireAndForget(async () => {
      const { chartType, uid, chartId } = body.object.metadata;
      const createdAt = new Date(body.object.timeCreated);

      try {
        const fileBuffer = await this.datafilesService.streamFromStorage(body.object.name);
        const parsedFile = this.datafilesService.parseCsv(fileBuffer);
        const validatedData = this.validationService.validateDatafile(parsedFile, chartType);
        const chartConfig = this.chartConfigService.generateChartConfig(chartType, validatedData);

        await this.transactionService.removeCreditsAndSaveChartConfig(
          uid,
          chartId,
          chartType,
          createdAt,
          chartConfig,
        );
      } catch (e) {
        const error = e as Error;
        this.logger.error(error);
        await firestore
          .collection('users')
          .doc(uid)
          .collection('errors')
          .doc(body.object.metadata.chartId)
          .set({ error: error.message });
      }
    });

    return {
      statusCode: 201,
      message: 'Datafile validation scheduled',
    };
  }
}
