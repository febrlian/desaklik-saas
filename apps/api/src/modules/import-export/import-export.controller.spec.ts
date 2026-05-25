import { Test, TestingModule } from '@nestjs/testing';
import {
  ImportExportController,
  ImportJobDto,
} from './import-export.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { getQueueToken } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '../../common/queue/job-types';

describe('ImportExportController', () => {
  let controller: ImportExportController;
  let mockPrisma: {
    importJob: {
      create: jest.Mock;
      findFirst: jest.Mock;
    };
  };
  let mockQueue: {
    add: jest.Mock;
  };

  beforeEach(async () => {
    mockPrisma = {
      importJob: {
        create: jest.fn().mockResolvedValue({
          id: 'import-job-1',
          tenantId: 'tenant-1',
          status: 'PENDING',
        }),
        findFirst: jest.fn().mockResolvedValue({
          id: 'import-job-1',
          tenantId: 'tenant-1',
          status: 'COMPLETED',
          rowsProcessed: 1500,
        }),
      },
    };

    mockQueue = {
      add: jest.fn().mockResolvedValue({ id: 'bullmq-import-1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportExportController],
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
        { provide: getQueueToken(QUEUE_NAMES.IMPORT), useValue: mockQueue },
      ],
    }).compile();

    controller = module.get<ImportExportController>(ImportExportController);
  });

  it('should accept an import processing request', async () => {
    const payload: ImportJobDto = { fileUrl: 'http://example.com/file.csv' };
    const result = await controller.importCitizens('tenant-1', payload);

    expect(result.jobId).toBe('import-job-1');
    expect(mockPrisma.importJob.create).toHaveBeenCalledWith({
      data: {
        tenantId: 'tenant-1',
        target: 'citizens',
        fileUrl: 'http://example.com/file.csv',
        status: 'PENDING',
      },
    });
    expect(mockQueue.add).toHaveBeenCalled();
  });

  it('should return job status', async () => {
    const result = await controller.getJobStatus('tenant-1', 'import-job-1');
    expect(result.status).toBe('COMPLETED');
    expect(result.rowsProcessed).toBe(1500);
  });
});
