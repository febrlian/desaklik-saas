import { Injectable, OnModuleInit } from '@nestjs/common';
import { QueueEvents } from 'bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { QueueLogger } from '../../common/queue/queue.logger';

@Injectable()
export class DocumentQueueEvents implements OnModuleInit {
  private events: QueueEvents;

  onModuleInit() {
    this.events = new QueueEvents(QUEUE_NAMES.DOCUMENT, {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    });

    QueueLogger.setupEvents(QUEUE_NAMES.DOCUMENT, this.events);
  }
}
