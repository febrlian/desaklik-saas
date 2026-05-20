import { DocumentQueueEvents } from "./document.events";
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { DocumentController } from './document.controller';
import { DocumentWorker } from './document.worker';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.DOCUMENT,
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentWorker, DocumentQueueEvents],
})
export class DocumentModule {}
