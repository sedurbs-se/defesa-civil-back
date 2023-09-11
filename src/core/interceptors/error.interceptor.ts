import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../logic/error';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: AppError | BadRequestException | Error | any) => {
        console.log(err.message)
        if (err instanceof AppError) {
          return throwError(
            () => new HttpException(err.message, err.statusCode),
          );
        }
        if (err instanceof BadRequestException) {
          return throwError(
            () => new HttpException(err.getResponse(), err.getStatus()),
          );
        }

        if (typeof err === 'object' && err.response) {
          return throwError(
            () =>
              new HttpException(
                {
                  error: err.response.error,
                  message: err.response.message,
                  statusCode: err.response.statusCode,
                },
                err.response.statusCode,
              ),
          );
        }

        return throwError(() => new HttpException(err.message, 500));
      }),
    );
  }
}
