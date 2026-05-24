import { Test, TestingModule } from '@nestjs/testing';
import {
  NotificationController,
  SendNotificationDto,
} from './notification.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { getQueueToken } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';

describe('NotificationController', () => {
  let controller: NotificationController;
  let mockPrisma: {
    notificationEvent: {
      create: jest.Mock;
      findFirst: jest.Mock;
    };
  };
  let mockQueue: {
    add: jest.Mock;
  };

  beforeEach(async () => {
    mockPrisma = {
      notificationEvent: {
        create: jest.fn().mockResolvedValue({
          id: 'event-1',
          tenantId: 'tenant-1',
          status: 'PENDING',
        }),
        findFirst: jest.fn().mockResolvedValue({
          id: 'event-1',
          tenantId: 'tenant-1',
          status: 'COMPLETED',
        }),
      },
    };

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: 'bullmq-event-1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
        {
          provide: getQueueToken(QUEUE_NAMES.NOTIFICATION),
          useValue: mockQueue,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should accept a notification dispatch request', async () => {
    const payload: SendNotificationDto = {
      provider: 'WA',
      recipient: '6281234567',
      data: {},
    };
    const result = await controller.sendNotification('tenant-1', payload);

    expect(result.eventId).toBe('event-1');
    expect(mockPrisma.notificationEvent.create).toHaveBeenCalledWith({
      data: {
        tenantId: 'tenant-1',
        provider: 'WA',
        recipient: '6281234567',
        status: 'PENDING',
      },
    });
    expect(mockQueue.add).toHaveBeenCalled();
  });

  it('should return event status', async () => {
    const result = await controller.getEventStatus('tenant-1', 'event-1');
    expect(result.status).toBe('COMPLETED');
  });
});
