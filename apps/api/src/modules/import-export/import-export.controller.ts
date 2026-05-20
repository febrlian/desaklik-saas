import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/queue/job-types';

@Controller('api/v1/imports')
export class ImportExportController {
  private readonly logger = new Logger(ImportExportController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.IMPORT) private readonly importQueue: Queue,
  ) {}

  @Post('citizens')
  @HttpCode(HttpStatus.ACCEPTED)
  async importCitizens(
    @CurrentTenant() tenantId: string,
    @Body() payload: { fileUrl: string },
  ) {
    this.logger.log(`Enqueueing citizen import for tenant ${tenantId}`);

    const job = await this.importQueue.add(JOB_NAMES.IMPORT_PROCESS, {
      tenantId,
      fileUrl: payload.fileUrl,
      target: 'citizens',
      metadata: { requestedAt: new Date().toISOString() },
    });

    return {
      message: 'Import job accepted',
      jobId: job.id,
    };
  }
}
