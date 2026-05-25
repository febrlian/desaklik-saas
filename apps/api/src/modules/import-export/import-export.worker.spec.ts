import { Test, TestingModule } from '@nestjs/testing';
import { ImportWorker, ImportPayload } from './import-export.worker';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JOB_NAMES } from '../../common/queue/job-types';
import { Job } from 'bullmq';

describe('ImportWorker', () => {
  let worker: ImportWorker;
  let mockPrisma: {
    importJob: {
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockPrisma = {
      importJob: {
        update: jest.fn().mockResolvedValue(true),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportWorker,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    worker = module.get<ImportWorker>(ImportWorker);
  });

  it('should process import job and update status correctly', async () => {
    const jobData: ImportPayload = {
      tenantId: 'tenant-1',
      jobRecordId: 'import-1',
      target: 'citizens',
      fileUrl: 'http://example.com/file.csv',
      data: {},
    };

    const job = {
      name: JOB_NAMES.IMPORT_PROCESS,
      id: 'job-1',
      data: jobData,
    } as unknown as Job<ImportPayload, any, string>;

    const result = (await worker.process(job)) as {
      status: string;
      rowsProcessed: number;
    };

    expect(result.status).toBe('success');
    expect(result.rowsProcessed).toBe(1500);
    expect(mockPrisma.importJob.update).toHaveBeenCalledWith({
      where: { id: 'import-1' },
      data: { status: 'PROCESSING' },
    });
    expect(mockPrisma.importJob.update).toHaveBeenCalledWith({
      where: { id: 'import-1' },
      data: { status: 'COMPLETED', rowsProcessed: 1500 },
    });
  });

  it('should set FAILED status if an error is thrown', async () => {
    const jobData: ImportPayload = {
      tenantId: 'tenant-1',
      jobRecordId: 'import-2',
      target: 'citizens',
      fileUrl: 'http://example.com/file.csv',
      data: { throwFatal: true },
    };

    const job = {
      name: JOB_NAMES.IMPORT_PROCESS,
      id: 'job-2',
      data: jobData,
    } as unknown as Job<ImportPayload, any, string>;

    await expect(worker.process(job)).rejects.toThrow(
      'FATAL: Invalid CSV format in http://example.com/file.csv',
    );

    expect(mockPrisma.importJob.update).toHaveBeenCalledWith({
      where: { id: 'import-2' },
      data: { status: 'FAILED' },
    });
  });
});
