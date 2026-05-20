import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { QUEUE_NAMES, JOB_NAMES, BaseJobPayload } from '../../common/queue/job-types';

export interface DocumentGeneratePayload extends BaseJobPayload {
  templateId: string;
  data: any;
}

@Processor(QUEUE_NAMES.DOCUMENT)
export class DocumentWorker extends WorkerHost {
  private readonly logger = new Logger(DocumentWorker.name);

  async process(job: Job<DocumentGeneratePayload, any, string>): Promise<any> {
    const { tenantId, templateId, data } = job.data;

    this.logger.log(`Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}]`);

    if (job.name === JOB_NAMES.DOCUMENT_GENERATE) {
      // Safety/Correctness: Idempotency guard check
      // E.g. Check if job.id already processed in DB, or if DocumentJob record is already COMPLETED
      // For baseline, we just log it.

      this.logger.log(`Processing document template [${templateId}]...`);

      // Simulate heavy work
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate non-retryable error if requested
      if (data?.throwFatal) {
         throw new Error('FATAL: Invalid template format');
      }

      // Simulate retryable error if requested (transient)
      if (data?.throwTransient) {
         throw new Error('Network timeout reaching document rendering service');
      }

      this.logger.log(`Successfully completed job [${job.name}] ID [${job.id}]`);

      return { status: 'success', documentUrl: `https://storage.desaklik.id/${tenantId}/${job.id}.pdf` };
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
