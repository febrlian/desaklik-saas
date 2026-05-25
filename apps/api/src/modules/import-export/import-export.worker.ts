import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import {
  QUEUE_NAMES,
  JOB_NAMES,
  BaseJobPayload,
} from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface ImportPayload extends BaseJobPayload {
  jobRecordId: string;
  fileUrl: string;
  target: string;
  data?: Record<string, unknown>;
}

@Processor(QUEUE_NAMES.IMPORT)
export class ImportWorker extends WorkerHost {
  private readonly logger = new Logger(ImportWorker.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<ImportPayload, any, string>): Promise<any> {
    const { tenantId, jobRecordId, fileUrl, target, data, correlationId } =
      job.data;

    this.logger.log(
      `[${correlationId}] Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}] targeting [${target}]`,
    );

    if (job.name === JOB_NAMES.IMPORT_PROCESS) {
      try {
        await this.prisma.importJob.update({
          where: { id: jobRecordId },
          data: { status: 'PROCESSING' },
        });

        this.logger.log(`Downloading and parsing file from [${fileUrl}]...`);

        // Simulate heavy parsing work
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Simulate non-retryable error if requested
        if (data && typeof data === 'object') {
          if ('throwFatal' in data && data.throwFatal) {
            throw new Error(`FATAL: Invalid CSV format in ${fileUrl}`);
          }

          // Simulate retryable error if requested (transient)
          if ('throwTransient' in data && data.throwTransient) {
            throw new Error(
              `Connection timeout reaching storage service for ${fileUrl}`,
            );
          }
        }

        const rowsProcessed = 1500;

        await this.prisma.importJob.update({
          where: { id: jobRecordId },
          data: { status: 'COMPLETED', rowsProcessed },
        });

        this.logger.log(
          `Successfully completed job [${job.name}] ID [${job.id}]`,
        );

        return {
          status: 'success',
          rowsProcessed,
        };
      } catch (error) {
        await this.prisma.importJob
          .update({
            where: { id: jobRecordId },
            data: { status: 'FAILED' },
          })
          .catch((err: unknown) => {
            this.logger.error(
              `Failed to update import job status to FAILED: ${String(err)}`,
            );
          });

        throw error;
      }
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
