import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total') private readonly requestsCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds') private readonly requestsDuration: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, route, url } = req;

    // For unresolved routes, use the raw url to avoid hiding the path, though normally you'd map to a pattern
    const requestRoute = route ? route.path : url;

    const endTimer = this.requestsDuration.startTimer();

    return next.handle().pipe(
      tap({
        next: () => {
          const statusCode = res.statusCode;
          this.recordMetrics(method, requestRoute, statusCode, endTimer);
        },
        error: (err) => {
          const statusCode = err.status || 500;
          this.recordMetrics(method, requestRoute, statusCode, endTimer);
        },
      }),
    );
  }

  private recordMetrics(method: string, route: string, statusCode: number, endTimer: (labels?: Record<string, string | number>) => number) {
    const labels = { method, route, status_code: statusCode.toString() };
    this.requestsCounter.labels(labels).inc();
    endTimer(labels);
  }
}
