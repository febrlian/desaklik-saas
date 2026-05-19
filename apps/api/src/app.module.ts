import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './modules/iam/iam.module';
import { VillageModule } from './modules/village/village.module';
import { CitizenModule } from './modules/citizen/citizen.module';
import { DocumentModule } from './modules/document/document.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ImportExportModule } from './modules/import-export/import-export.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PlatformModule } from './modules/platform/platform.module';

@Module({
  imports: [IamModule, VillageModule, CitizenModule, DocumentModule, NotificationModule, ImportExportModule, AnalyticsModule, PlatformModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
