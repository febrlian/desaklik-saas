import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

interface CustomRequest extends Request {
  tenantId?: string;
}

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
        genReqId: (req) => req.headers['x-request-id'] || uuidv4(),
        customProps: (req) => {
          const customReq = req as CustomRequest;
          return {
            tenantId:
              customReq.tenantId || customReq.headers['x-tenant-id'] || null,
          };
        },
      },
    }),
  ],
})
export class AppLoggerModule {}
