import { MetricsInterceptor } from './metrics.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { Counter, Histogram } from 'prom-client';

describe('MetricsInterceptor', () => {
  let interceptor: MetricsInterceptor;
  let mockCounter: Partial<Counter<string>>;
  let mockHistogram: Partial<Histogram<string>>;
  let mockContext: Partial<ExecutionContext>;
  let mockCallHandler: Partial<CallHandler>;

  beforeEach(() => {
    const endTimerMock = jest.fn();
    mockCounter = {
      labels: jest.fn().mockReturnValue({ inc: jest.fn() }),
    };
    mockHistogram = {
      startTimer: jest.fn().mockReturnValue(endTimerMock),
    };

    interceptor = new MetricsInterceptor(
      mockCounter as Counter<string>,
      mockHistogram as Histogram<string>,
    );

    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({ method: 'GET', route: { path: '/test' }, url: '/test' }),
        getResponse: () => ({ statusCode: 200 }),
      }),
    };

    mockCallHandler = {
      handle: () => of('test-response'),
    };
  });

  it('should intercept and record metrics on success', (done) => {
    const observable = interceptor.intercept(
      mockContext as ExecutionContext,
      mockCallHandler as CallHandler,
    );

    observable.subscribe({
      next: () => {
        expect(mockHistogram.startTimer).toHaveBeenCalled();
        expect(mockCounter.labels).toHaveBeenCalledWith({
          method: 'GET',
          route: '/test',
          status_code: '200',
        });
        done();
      },
    });
  });
});
