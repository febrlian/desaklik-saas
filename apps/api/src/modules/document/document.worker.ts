import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import {
  QUEUE_NAMES,
  JOB_NAMES,
  BaseJobPayload,
} from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface DocumentGeneratePayload extends BaseJobPayload {
  jobRecordId: string;
  templateId: string;
  data: Record<string, unknown>;
}

@Processor(QUEUE_NAMES.DOCUMENT)
export class DocumentWorker extends WorkerHost {
  private readonly logger = new Logger(DocumentWorker.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<DocumentGeneratePayload, any, string>): Promise<any> {
    const { tenantId, templateId, data, jobRecordId } = job.data;

    this.logger.log(
      `Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}]`,
    );

    if (job.name === JOB_NAMES.DOCUMENT_GENERATE) {
      try {
        await this.prisma.documentJob.update({
          where: { id: jobRecordId },
          data: { status: 'PROCESSING' },
        });

        this.logger.log(`Processing document template [${templateId}]...`);

        // Simulate heavy work
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate non-retryable error if requested
        if (data && typeof data === 'object') {
          if ('throwFatal' in data && data.throwFatal) {
            throw new Error('FATAL: Invalid template format');
          }

          // Simulate retryable error if requested (transient)
          if ('throwTransient' in data && data.throwTransient) {
            throw new Error(
              'Network timeout reaching document rendering service',
            );
          }
        }

        const documentUrl = `https://storage.desaklik.id/${tenantId}/${jobRecordId}.pdf`;

        await this.prisma.documentJob.update({
          where: { id: jobRecordId },
          data: { status: 'COMPLETED', resultUrl: documentUrl },
        });

        this.logger.log(
          `Successfully completed job [${job.name}] ID [${job.id}]`,
        );

        return {
          status: 'success',
          documentUrl,
        };
      } catch (error) {
        await this.prisma.documentJob
          .update({
            where: { id: jobRecordId },
            data: { status: 'FAILED' },
          })
          .catch((err: unknown) => {
            this.logger.error(
              `Failed to update job status to FAILED: ${String(err)}`,
            );
          });

        throw error;
      }
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
