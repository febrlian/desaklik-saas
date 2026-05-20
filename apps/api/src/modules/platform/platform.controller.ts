import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';

@Controller('api/v1/platform/jobs')
export class PlatformController {
  private readonly logger = new Logger(PlatformController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.DOCUMENT) private readonly documentQueue: Queue,
    @InjectQueue(QUEUE_NAMES.IMPORT) private readonly importQueue: Queue,
  ) {}

  @Post('retry/:queueName/:jobId')
  @HttpCode(HttpStatus.OK)
  async retryFailedJob(
    @Param('queueName') queueName: string,
    @Param('jobId') jobId: string,
  ) {
    this.logger.log(`Attempting to retry job ${jobId} in queue ${queueName}`);

    let queue: Queue;
    if (queueName === QUEUE_NAMES.DOCUMENT) queue = this.documentQueue;
    else if (queueName === QUEUE_NAMES.IMPORT) queue = this.importQueue;
    else throw new Error(`Unknown queue ${queueName}`);

    const job = await queue.getJob(jobId);

    if (!job) {
      return { success: false, message: 'Job not found' };
    }

    if (await job.isFailed()) {
      await job.retry();
      return { success: true, message: `Job ${jobId} sent for retry` };
    }

    return { success: false, message: `Job ${jobId} is not in a failed state` };
  }
}
