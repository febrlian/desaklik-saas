import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';
import { PlatformController } from './platform.controller';

@Module({
  imports: [
    BullModule.registerQueue({ name: QUEUE_NAMES.DOCUMENT }),
    BullModule.registerQueue({ name: QUEUE_NAMES.IMPORT }),
  ],
  controllers: [PlatformController],
})
export class PlatformModule {}
