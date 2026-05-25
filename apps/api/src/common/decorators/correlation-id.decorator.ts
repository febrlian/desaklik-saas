import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // If pino-http generated an ID, it attaches it to req.id
    return request.headers['x-request-id'] || request.id || 'no-correlation-id';
  },
);
