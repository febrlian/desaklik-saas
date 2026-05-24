import { Test, TestingModule } from '@nestjs/testing';
import {
  NotificationWorker,
  NotificationSendPayload,
} from './notification.worker';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JOB_NAMES } from '../../common/queue/job-types';
import { Job } from 'bullmq';

describe('NotificationWorker', () => {
  let worker: NotificationWorker;
  let mockPrisma: {
    notificationEvent: {
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockPrisma = {
      notificationEvent: {
        update: jest.fn().mockResolvedValue(true),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationWorker,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    worker = module.get<NotificationWorker>(NotificationWorker);
  });

  it('should process notification dispatch and update status correctly', async () => {
    const jobData: NotificationSendPayload = {
      tenantId: 'tenant-1',
      eventRecordId: 'event-1',
      provider: 'EMAIL',
      recipient: 'test@example.com',
      data: {},
    };

    const job = {
      name: JOB_NAMES.NOTIFICATION_SEND,
      id: 'job-1',
      data: jobData,
    } as unknown as Job<NotificationSendPayload, any, string>;

    const result = (await worker.process(job)) as {
      status: string;
    };

    expect(result.status).toBe('success');
    expect(mockPrisma.notificationEvent.update).toHaveBeenCalledWith({
      where: { id: 'event-1' },
      data: { status: 'PROCESSING' },
    });
    expect(mockPrisma.notificationEvent.update).toHaveBeenCalledWith({
      where: { id: 'event-1' },
      data: { status: 'COMPLETED' },
    });
  });

  it('should set FAILED status if an error is thrown', async () => {
    const jobData: NotificationSendPayload = {
      tenantId: 'tenant-1',
      eventRecordId: 'event-2',
      provider: 'SMS',
      recipient: '081234',
      data: { throwFatal: true },
    };

    const job = {
      name: JOB_NAMES.NOTIFICATION_SEND,
      id: 'job-2',
      data: jobData,
    } as unknown as Job<NotificationSendPayload, any, string>;

    await expect(worker.process(job)).rejects.toThrow(
      'FATAL: Invalid recipient address for provider SMS',
    );

    expect(mockPrisma.notificationEvent.update).toHaveBeenCalledWith({
      where: { id: 'event-2' },
      data: { status: 'FAILED' },
    });
  });
});
