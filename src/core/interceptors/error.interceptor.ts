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
      catchError((err: AppError | BadRequestException | Error) => {
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

        return throwError(() => new HttpException(err.message, 500));
      }),
    );
  }
}
