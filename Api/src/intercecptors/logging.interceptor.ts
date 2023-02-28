import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, path: url } = request;
    return next.handle().pipe(
      tap((res) => {
        // request success
        // response data is in res
        this.logger.log(
          `Response to ${ip} method ${method} from ${url} ${res}`,
        );
      }),
      catchError((err) => {
        // log error
        // can write file
        // can insert into database
        this.logger.error(
          `Error Response to ${ip} method ${method} from ${url} ${err.message}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
