import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import {
  QUEUE_NAMES,
  JOB_NAMES,
  BaseJobPayload,
} from '../../common/queue/job-types';

export interface DocumentGeneratePayload extends BaseJobPayload {
  templateId: string;
  data: Record<string, unknown>;
}

@Processor(QUEUE_NAMES.DOCUMENT)
export class DocumentWorker extends WorkerHost {
  private readonly logger = new Logger(DocumentWorker.name);

  async process(job: Job<DocumentGeneratePayload, any, string>): Promise<any> {
    const tenantId = job.data.tenantId;
    const templateId = job.data.templateId;
    const data = job.data.data;

    this.logger.log(
      `Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}]`,
    );

    if (job.name === JOB_NAMES.DOCUMENT_GENERATE) {
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

      this.logger.log(
        `Successfully completed job [${job.name}] ID [${job.id}]`,
      );

      return {
        status: 'success',
        documentUrl: `https://storage.desaklik.id/${tenantId}/${job.id}.pdf`,
      };
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
