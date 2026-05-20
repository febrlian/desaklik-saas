import { Test, TestingModule } from '@nestjs/testing';
import { DocumentWorker } from './document.worker';
import { JOB_NAMES } from '../../common/queue/job-types';
import { Job } from 'bullmq';

describe('DocumentWorker', () => {
  let worker: DocumentWorker;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentWorker],
    }).compile();

    worker = module.get<DocumentWorker>(DocumentWorker);
  });

  it('should process document correctly', async () => {
    const job = {
      name: JOB_NAMES.DOCUMENT_GENERATE,
      id: 'job-1',
      data: { tenantId: 'tenant-1', templateId: 'tpl-1' }
    } as Job;

    const result = await worker.process(job);
    expect(result.status).toBe('success');
    expect(result.documentUrl).toContain('tenant-1');
  });

  it('should handle fatal error without retries if explicitly coded', async () => {
    const job = {
      name: JOB_NAMES.DOCUMENT_GENERATE,
      id: 'job-2',
      data: { tenantId: 'tenant-1', templateId: 'tpl-1', data: { throwFatal: true } }
    } as Job;

    await expect(worker.process(job)).rejects.toThrow('FATAL: Invalid template format');
  });
});
