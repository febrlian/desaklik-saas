import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { Request, Response } from 'express';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly requestsCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly requestsDuration: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const method = req.method;
    const url = req.url;

    // Express Request.route might be undefined for 404s, fallback to url
    const routeInfo = req.route as { path?: string } | undefined;
    const requestRoute = routeInfo?.path || url;

    const endTimer = this.requestsDuration.startTimer();

    return next.handle().pipe(
      tap({
        next: () => {
          const statusCode = res.statusCode;
          this.recordMetrics(method, requestRoute, statusCode, endTimer);
        },
        error: (err: unknown) => {
          let statusCode = 500;
          if (
            err &&
            typeof err === 'object' &&
            'status' in err &&
            typeof err.status === 'number'
          ) {
            statusCode = err.status;
          }
          this.recordMetrics(method, requestRoute, statusCode, endTimer);
        },
      }),
    );
  }

  private recordMetrics(
    method: string,
    route: string,
    statusCode: number,
    endTimer: (labels?: Record<string, string | number>) => number,
  ) {
    const labels = { method, route, status_code: statusCode.toString() };
    this.requestsCounter.labels(labels).inc();
    endTimer(labels);
  }
}
