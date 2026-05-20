import { Module, Global, Logger } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

const logger = new Logger('QueueFoundationModule');

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => {
        logger.log('Initializing BullMQ root module...');
        return {
          connection: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || undefined,
            maxRetriesPerRequest: null,
            // Fallback strategy if redis is unavailable (prevents crash loops in local/test)
            retryStrategy: (times) => {
              if (times > 3) {
                logger.warn(`Redis connection retries exceeded, delaying next retry...`);
                return 5000;
              }
              return Math.min(times * 100, 3000);
            }
          },
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
            removeOnComplete: {
              age: 3600,
              count: 1000,
            },
            removeOnFail: {
              age: 24 * 3600 * 7,
            },
          },
        };
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueFoundationModule {}
