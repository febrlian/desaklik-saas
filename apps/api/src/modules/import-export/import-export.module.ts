import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { ImportExportController } from './import-export.controller';
import { ImportWorker } from './import-export.worker';
import { ImportQueueEvents } from './import-export.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.IMPORT,
    }),
  ],
  controllers: [ImportExportController],
  providers: [ImportWorker, ImportQueueEvents],
})
export class ImportExportModule {}
