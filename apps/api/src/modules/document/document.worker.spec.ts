import { Test, TestingModule } from '@nestjs/testing';
import { DocumentWorker, DocumentGeneratePayload } from './document.worker';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JOB_NAMES } from '../../common/queue/job-types';
import { Job } from 'bullmq';

describe('DocumentWorker', () => {
  let worker: DocumentWorker;
  let mockPrisma: any;

  beforeEach(async () => {
    mockPrisma = {
      documentJob: {
        update: jest.fn().mockResolvedValue(true),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentWorker,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    worker = module.get<DocumentWorker>(DocumentWorker);
  });

  it('should process document and update job status correctly', async () => {
    const job = {
      name: JOB_NAMES.DOCUMENT_GENERATE,
      id: 'job-1',
      data: { tenantId: 'tenant-1', templateId: 'tpl-1', jobRecordId: 'doc-job-1' } as DocumentGeneratePayload
    } as unknown as Job<DocumentGeneratePayload, any, string>;

    const result = (await worker.process(job)) as { status: string; documentUrl: string };

    expect(result.status).toBe('success');
    expect(result.documentUrl).toContain('tenant-1');
    expect(mockPrisma.documentJob.update).toHaveBeenCalledWith({
      where: { id: 'doc-job-1' },
      data: { status: 'PROCESSING' }
    });
    expect(mockPrisma.documentJob.update).toHaveBeenCalledWith({
      where: { id: 'doc-job-1' },
      data: { status: 'COMPLETED', resultUrl: expect.stringContaining('job-1.pdf') }
    });
  });

  it('should set FAILED status if an error is thrown', async () => {
    const job = {
      name: JOB_NAMES.DOCUMENT_GENERATE,
      id: 'job-2',
      data: { tenantId: 'tenant-1', templateId: 'tpl-1', jobRecordId: 'doc-job-2', data: { throwFatal: true } } as DocumentGeneratePayload
    } as unknown as Job<DocumentGeneratePayload, any, string>;

    await expect(worker.process(job)).rejects.toThrow('FATAL: Invalid template format');

    expect(mockPrisma.documentJob.update).toHaveBeenCalledWith({
      where: { id: 'doc-job-2' },
      data: { status: 'FAILED' }
    });
  });
});
