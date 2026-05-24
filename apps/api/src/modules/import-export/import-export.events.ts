import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { QueueEvents } from 'bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { QueueLogger } from '../../common/queue/queue.logger';

@Injectable()
export class ImportQueueEvents implements OnModuleInit, OnModuleDestroy {
  private events: QueueEvents;
  private readonly logger = new Logger(ImportQueueEvents.name);

  onModuleInit() {
    try {
      this.events = new QueueEvents(QUEUE_NAMES.IMPORT, {
        connection: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
        },
      });

      QueueLogger.setupEvents(QUEUE_NAMES.IMPORT, this.events);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `Failed to initialize ImportQueueEvents: ${e.message}`,
        );
      } else {
        this.logger.error(
          `Failed to initialize ImportQueueEvents: ${String(e)}`,
        );
      }
    }
  }

  async onModuleDestroy() {
    if (this.events) {
      try {
        await this.events.close();
      } catch {
        // ignore close error
      }
    }
  }
}
