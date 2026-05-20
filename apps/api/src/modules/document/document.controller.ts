import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/queue/job-types';

@Controller('api/v1/documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.DOCUMENT) private readonly documentQueue: Queue,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.ACCEPTED)
  async generateDocument(
    @CurrentTenant() tenantId: string,
    @Body() payload: { templateId: string; data: any },
  ) {
    this.logger.log(`Enqueueing document generation for tenant ${tenantId}`);

    const job = await this.documentQueue.add(JOB_NAMES.DOCUMENT_GENERATE, {
      tenantId,
      templateId: payload.templateId,
      data: payload.data,
      metadata: { requestedAt: new Date().toISOString() },
    });

    return {
      message: 'Document generation job accepted',
      jobId: job.id,
    };
  }
}
