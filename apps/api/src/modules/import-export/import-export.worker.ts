import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import {
  QUEUE_NAMES,
  JOB_NAMES,
  BaseJobPayload,
} from '../../common/queue/job-types';

export interface ImportPayload extends BaseJobPayload {
  fileUrl: string;
  target: string;
}

@Processor(QUEUE_NAMES.IMPORT)
export class ImportWorker extends WorkerHost {
  private readonly logger = new Logger(ImportWorker.name);

  async process(job: Job<ImportPayload, any, string>): Promise<any> {
    const { tenantId, fileUrl, target } = job.data;

    this.logger.log(
      `Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}] targeting [${target}]`,
    );

    if (job.name === JOB_NAMES.IMPORT_PROCESS) {
      this.logger.log(`Downloading and parsing file from [${fileUrl}]...`);

      // Simulate heavy parsing work
      await new Promise((resolve) => setTimeout(resolve, 3000));

      this.logger.log(
        `Successfully completed job [${job.name}] ID [${job.id}]`,
      );

      return { status: 'success', rowsProcessed: 1500 };
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
