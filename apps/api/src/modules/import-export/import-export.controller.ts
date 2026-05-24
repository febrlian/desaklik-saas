import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export class ImportJobDto {
  fileUrl: string;
  data?: Record<string, unknown>;
}

@Controller('api/v1/imports')
export class ImportExportController {
  private readonly logger = new Logger(ImportExportController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.IMPORT) private readonly importQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  @Post('citizens')
  @HttpCode(HttpStatus.ACCEPTED)
  async importCitizens(
    @CurrentTenant() tenantId: string,
    @Body() payload: ImportJobDto,
  ) {
    this.logger.log(`Enqueueing citizen import for tenant ${tenantId}`);

    const importJob = await this.prisma.importJob.create({
      data: {
        tenantId,
        target: 'citizens',
        fileUrl: payload.fileUrl,
        status: 'PENDING',
      },
    });

    await this.importQueue.add(
      JOB_NAMES.IMPORT_PROCESS,
      {
        tenantId,
        jobRecordId: importJob.id,
        fileUrl: payload.fileUrl,
        target: 'citizens',
        data: payload.data || {},
        metadata: { requestedAt: new Date().toISOString() },
      },
      {
        jobId: importJob.id,
      },
    );

    return {
      message: 'Import job accepted',
      jobId: importJob.id,
    };
  }

  @Get('jobs/:jobId')
  async getJobStatus(
    @CurrentTenant() tenantId: string,
    @Param('jobId') jobId: string,
  ) {
    const job = await this.prisma.importJob.findFirst({
      where: {
        id: jobId,
        tenantId,
      },
    });

    if (!job) {
      throw new NotFoundException(`Import job with ID ${jobId} not found`);
    }

    return job;
  }
}
