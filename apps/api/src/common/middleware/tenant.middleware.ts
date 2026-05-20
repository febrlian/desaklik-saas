import { Injectable, NestMiddleware, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  tenantId: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: TenantRequest, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    if (!tenantId) {
      throw new BadRequestException('X-Tenant-Id header is missing');
    }

    if (Array.isArray(tenantId)) {
        throw new BadRequestException('X-Tenant-Id header must be a single value');
    }

    req.tenantId = tenantId;
    next();
  }
}
