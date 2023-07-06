import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Logger, Post, UsePipes, Body, Controller } from '@nestjs/common';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { NotificationsService } from '@ntua-saas-10/server/nest/notifications';
import { fireAndForget } from '@ntua-saas-10/server/nest/utils';
import { NotificationType } from '@ntua-saas-10/shared-consts';
import { ValidateDatafileRequestDto, ValidateDatafileResponseDto } from '@ntua-saas-10/shared-dtos';

import { ValidationService } from './validation.service';

@Controller('validation')
export class ValidationController {
  private readonly logger = new Logger(ValidationController.name);
  constructor(
    private readonly validationService: ValidationService,
    private readonly datafilesService: DatafilesService,
    private readonly chartConfigService: ChartConfigService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post('validate-csv')
  @UsePipes(ZodValidationPipe)
  async validateDatafile(
    @Body()
    body: ValidateDatafileRequestDto,
  ): Promise<ValidateDatafileResponseDto> {
    fireAndForget(async () => {
      const { name } = body.object;
      const { chartTitle, chartType, uid, chartId } = body.object.metadata;
      const createdAt = new Date(body.object.timeCreated);

      try {
        const fileBuffer = await this.datafilesService.streamFromStorage(body.object.name);
        const parsedFile = this.datafilesService.parseCsv(fileBuffer);
        const validatedData = this.validationService.validateDatafile(parsedFile, chartType);
        const chartConfig = this.chartConfigService.generateChartConfig(
          chartTitle,
          chartType,
          validatedData,
        );
        this.logger.log(`Chart config generated for chart ${chartId} for user ${uid}`);
        await this.chartConfigService.saveChartConfig(uid, {
          chartTitle,
          chartId,
          chartType,
          chartConfig,
          createdAt,
          uploadedDatafilePath: name,
        });

        await this.notificationsService.saveNotificationToFirestore(uid, chartId, {
          chartId: chartId,
          type: NotificationType.success,
          createdAt: new Date(),
          data: {
            title: 'Datafile validation successful',
            message: 'You can preview your chart now',
          },
          delivered: false,
        });
      } catch (e) {
        const error = e as Error;

        await this.notificationsService.saveNotificationToFirestore(uid, chartId, {
          chartId: chartId,
          type: NotificationType.error,
          createdAt: new Date(),
          data: {
            title: 'Datafile validation failed',
            message: error.message,
          },
          delivered: false,
        });

        this.logger.error(error);
      }
    });

    return {
      statusCode: 201,
      message: 'Datafile validation scheduled',
    };
  }
}
