import { Body, Controller, HttpCode, Post, Req, UsePipes } from '@nestjs/common';
import type { Types } from '@ntua-saas-10/shared-types';
import { TransactionService } from './transaction.service';
import { ChartConfigService } from '@ntua-saas-10/server/nest/chart-config';
import { DatafilesService } from '@ntua-saas-10/server/nest/datafiles';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { TransactionRequestDto } from '@ntua-saas-10/shared-dtos';

@Controller('transaction')
export class TransactionController {
  private readonly FILES_DEST: string;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly chartConfigService: ChartConfigService,
    private readonly datafilesService: DatafilesService,
    private readonly configService: ConfigService,
  ) {
    this.FILES_DEST = this.configService.getOrThrow('FILES_DEST');
  }

  @Post('verify')
  @UsePipes(ZodValidationPipe)
  @HttpCode(200)
  async verifyTransaction(@Body() body: TransactionRequestDto, @Req() req: Types.AuthRequest) {
    await this.transactionService.removeCreditsAndClaimChart(req.user.uid, body.chartId);

    return {
      statusCode: 200,
      message: 'Transaction executed successfully',
    };
  }

  @Post('abort')
  @UsePipes(ZodValidationPipe)
  @HttpCode(200)
  async abortTransaction(@Req() req: Types.AuthRequest, @Body() body: TransactionRequestDto) {
    const { uid } = req.user;
    const { chartId, uploadedDatafilePath } = body;

    await this.chartConfigService.deleteChartConfig(uid, chartId);
    await this.datafilesService.deleteFile(uploadedDatafilePath, req.user.uid);

    return {
      statusCode: 200,
      message: 'Transaction has been aborted',
    };
  }
}
