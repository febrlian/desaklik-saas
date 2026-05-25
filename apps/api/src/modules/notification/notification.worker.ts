import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import {
  QUEUE_NAMES,
  JOB_NAMES,
  BaseJobPayload,
} from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface NotificationSendPayload extends BaseJobPayload {
  eventRecordId: string;
  provider: string;
  recipient: string;
  templateId?: string;
  data: Record<string, unknown>;
}

@Processor(QUEUE_NAMES.NOTIFICATION)
export class NotificationWorker extends WorkerHost {
  private readonly logger = new Logger(NotificationWorker.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<NotificationSendPayload, any, string>): Promise<any> {
    const {
      tenantId,
      eventRecordId,
      provider,
      recipient,
      data,
      correlationId,
    } = job.data;

    this.logger.log(
      `[${correlationId}] Starting job [${job.name}] ID [${job.id}] for tenant [${tenantId}] to [${recipient}] via [${provider}]`,
    );

    if (job.name === JOB_NAMES.NOTIFICATION_SEND) {
      try {
        await this.prisma.notificationEvent.update({
          where: { id: eventRecordId },
          data: { status: 'PROCESSING' },
        });

        this.logger.log(
          `Dispatching notification via provider [${provider}]...`,
        );

        // Simulate API network call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate provider rejection (fatal)
        if (data && typeof data === 'object') {
          if ('throwFatal' in data && data.throwFatal) {
            throw new Error(
              `FATAL: Invalid recipient address for provider ${provider}`,
            );
          }

          // Simulate rate limit or timeout (transient)
          if ('throwTransient' in data && data.throwTransient) {
            throw new Error(`Provider ${provider} rate limit exceeded`);
          }
        }

        await this.prisma.notificationEvent.update({
          where: { id: eventRecordId },
          data: { status: 'COMPLETED' },
        });

        this.logger.log(
          `Successfully completed job [${job.name}] ID [${job.id}]`,
        );

        return {
          status: 'success',
          deliveredAt: new Date().toISOString(),
        };
      } catch (error) {
        await this.prisma.notificationEvent
          .update({
            where: { id: eventRecordId },
            data: { status: 'FAILED' },
          })
          .catch((err: unknown) => {
            this.logger.error(
              `Failed to update event status to FAILED: ${String(err)}`,
            );
          });

        throw error;
      }
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }
}
