import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { QueueEvents } from 'bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { QueueLogger } from '../../common/queue/queue.logger';

@Injectable()
export class DocumentQueueEvents implements OnModuleInit, OnModuleDestroy {
  private events: QueueEvents;
  private readonly logger = new Logger(DocumentQueueEvents.name);

  onModuleInit() {
    try {
      this.events = new QueueEvents(QUEUE_NAMES.DOCUMENT, {
        connection: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
        },
      });

      QueueLogger.setupEvents(QUEUE_NAMES.DOCUMENT, this.events);
    } catch (e) {
      this.logger.error(`Failed to initialize DocumentQueueEvents: ${e.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.events) {
      try {
        await this.events.close();
      } catch (e) {
         // ignore close error
      }
    }
  }
}
