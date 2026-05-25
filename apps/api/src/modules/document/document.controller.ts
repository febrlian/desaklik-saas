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
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export class GenerateDocumentDto {
  templateId: string;
  data: Record<string, unknown>;
}

@Controller('api/v1/documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.DOCUMENT) private readonly documentQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.ACCEPTED)
  async generateDocument(
    @CurrentTenant() tenantId: string,
    @Body() payload: GenerateDocumentDto,
    @CorrelationId() correlationId: string,
  ) {
    this.logger.log(
      `[${correlationId}] Enqueueing document generation for tenant ${tenantId}`,
    );

    // Create DB record to track the job
    const documentJob = await this.prisma.documentJob.create({
      data: {
        tenantId,
        status: 'PENDING',
      },
    });

    // Enqueue the job with the DB record ID
    await this.documentQueue.add(
      JOB_NAMES.DOCUMENT_GENERATE,
      {
        tenantId,
        templateId: payload.templateId,
        data: payload.data,
        jobRecordId: documentJob.id,
        correlationId,
        metadata: { requestedAt: new Date().toISOString() },
      },
      {
        jobId: documentJob.id, // Bind bullmq jobId to our DB ID for easy tracking
      },
    );

    return {
      message: 'Document generation job accepted',
      jobId: documentJob.id,
    };
  }

  @Get('jobs/:jobId')
  async getJobStatus(
    @CurrentTenant() tenantId: string,
    @Param('jobId') jobId: string,
  ) {
    const job = await this.prisma.documentJob.findFirst({
      where: {
        id: jobId,
        tenantId,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    return job;
  }
}
