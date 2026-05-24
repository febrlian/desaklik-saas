import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { NotificationController } from './notification.controller';
import { NotificationWorker } from './notification.worker';
import { NotificationQueueEvents } from './notification.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.NOTIFICATION,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationWorker, NotificationQueueEvents],
})
export class NotificationModule {}
