export const QUEUE_NAMES = {
  DOCUMENT: 'document_queue',
  IMPORT: 'import_queue',
  NOTIFICATION: 'notification_queue',
};

export const JOB_NAMES = {
  DOCUMENT_GENERATE: 'document.generate',
  IMPORT_PROCESS: 'import.process',
  NOTIFICATION_SEND: 'notification.send',
};

// Standard Job Payload wrapper to ensure tenant context is always present
export interface BaseJobPayload {
  tenantId: string;
  correlationId?: string; // For tracing
  metadata?: Record<string, any>; // Optional context data
}
