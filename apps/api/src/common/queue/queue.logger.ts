import { Logger } from '@nestjs/common';
import { QueueEvents } from 'bullmq';

export class QueueLogger {
  static setupEvents(queueName: string, events: QueueEvents) {
    const logger = new Logger(`QueueEvents-${queueName}`);

    events.on('added', ({ jobId, name }) => {
      logger.log(`Job [${name}] ID [${jobId}] added to queue`);
    });

    events.on('completed', ({ jobId, returnvalue }) => {
      logger.log(`Job ID [${jobId}] completed. Result: ${JSON.stringify(returnvalue)}`);
    });

    events.on('failed', ({ jobId, failedReason }) => {
      logger.error(`Job ID [${jobId}] failed. Reason: ${failedReason}`);
    });

    events.on('error', (err) => {
      logger.error(`Queue error: ${err.message}`, err.stack);
    });
  }
}
