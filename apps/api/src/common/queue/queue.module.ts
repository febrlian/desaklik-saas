import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
        // In production you might want TLS configuration here
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000, // 1s, 2s, 4s...
        },
        removeOnComplete: {
          age: 3600, // keep for 1 hour
          count: 1000, // keep max 1000 completed jobs
        },
        removeOnFail: {
          age: 24 * 3600 * 7, // keep failed jobs for 7 days (essentially our DLQ state in BullMQ)
        },
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueFoundationModule {}
