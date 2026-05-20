import { AppMetricsModule } from './common/metrics/metrics.module';
import { AppLoggerModule } from './common/logger/logger.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueFoundationModule } from './common/queue/queue.module';
import { IamModule } from './modules/iam/iam.module';
import { VillageModule } from './modules/village/village.module';
import { CitizenModule } from './modules/citizen/citizen.module';
import { DocumentModule } from './modules/document/document.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ImportExportModule } from './modules/import-export/import-export.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PlatformModule } from './modules/platform/platform.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

@Module({
  imports: [
    AppMetricsModule,
    AppLoggerModule,
    QueueFoundationModule,
    IamModule,
    VillageModule,
    CitizenModule,
    DocumentModule,
    NotificationModule,
    ImportExportModule,
    AnalyticsModule,
    PlatformModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes(
        'api/v1/villages',
        'api/v1/citizens',
        'api/v1/documents',
        'api/v1/imports',
      );
  }
}
