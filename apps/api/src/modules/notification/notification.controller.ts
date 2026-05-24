import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CurrentTenant } from '../../common/decorators/tenant.decorator';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/queue/job-types';
import { PrismaService } from '../../common/prisma/prisma.service';

export class SendNotificationDto {
  provider: string; // e.g. WA, EMAIL, SMS
  recipient: string;
  templateId?: string;
  data: Record<string, unknown>;
}

@Controller('api/v1/notifications')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.NOTIFICATION)
    private readonly notificationQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  @Post('send')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendNotification(
    @CurrentTenant() tenantId: string,
    @Body() payload: SendNotificationDto,
  ) {
    this.logger.log(`Enqueueing notification dispatch for tenant ${tenantId}`);

    const notificationEvent = await this.prisma.notificationEvent.create({
      data: {
        tenantId,
        provider: payload.provider,
        recipient: payload.recipient,
        status: 'PENDING',
      },
    });

    await this.notificationQueue.add(
      JOB_NAMES.NOTIFICATION_SEND,
      {
        tenantId,
        provider: payload.provider,
        recipient: payload.recipient,
        templateId: payload.templateId,
        data: payload.data,
        eventRecordId: notificationEvent.id,
        metadata: { requestedAt: new Date().toISOString() },
      },
      {
        jobId: notificationEvent.id,
      },
    );

    return {
      message: 'Notification dispatch job accepted',
      eventId: notificationEvent.id,
    };
  }

  @Get('events/:eventId')
  async getEventStatus(
    @CurrentTenant() tenantId: string,
    @Param('eventId') eventId: string,
  ) {
    const event = await this.prisma.notificationEvent.findFirst({
      where: {
        id: eventId,
        tenantId,
      },
    });

    if (!event) {
      throw new NotFoundException(
        `Notification event with ID ${eventId} not found`,
      );
    }

    return event;
  }
}
