import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController, GenerateDocumentDto } from './document.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { getQueueToken } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';

describe('DocumentController', () => {
  let controller: DocumentController;
  let mockPrisma: {
    documentJob: {
      create: jest.Mock;
      findFirst: jest.Mock;
    };
  };
  let mockQueue: {
    add: jest.Mock;
  };

  beforeEach(async () => {
    mockPrisma = {
      documentJob: {
        create: jest.fn().mockResolvedValue({
          id: 'doc-job-1',
          tenantId: 'tenant-1',
          status: 'PENDING',
        }),
        findFirst: jest.fn().mockResolvedValue({
          id: 'doc-job-1',
          tenantId: 'tenant-1',
          status: 'COMPLETED',
        }),
      },
    };

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: 'bullmq-job-1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
        { provide: getQueueToken(QUEUE_NAMES.DOCUMENT), useValue: mockQueue },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should accept a document generation request', async () => {
    const payload: GenerateDocumentDto = { templateId: 'tpl-1', data: {} };
    const result = await controller.generateDocument('tenant-1', payload);

    expect(result.jobId).toBe('doc-job-1');
    expect(mockPrisma.documentJob.create).toHaveBeenCalledWith({
      data: { tenantId: 'tenant-1', status: 'PENDING' },
    });
    expect(mockQueue.add).toHaveBeenCalled();
  });

  it('should return job status', async () => {
    const result = await controller.getJobStatus('tenant-1', 'doc-job-1');
    expect(result.status).toBe('COMPLETED');
  });
});
