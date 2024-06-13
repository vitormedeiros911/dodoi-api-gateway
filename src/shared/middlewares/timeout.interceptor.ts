import {
  CallHandler,
  ExecutionContext,
  GatewayTimeoutException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(10000),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          return throwError(
            () => new GatewayTimeoutException('Requisição expirou'),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
