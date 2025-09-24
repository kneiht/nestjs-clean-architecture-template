import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  UseCaseReponse,
  SuccessType,
  ErrorType,
} from '@/application/use-cases/response';
import { Response } from 'express';

@Injectable()
export class UseCaseResponseInterceptor<T>
  implements NestInterceptor<T, UseCaseReponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UseCaseReponse<T>> {
    return next.handle().pipe(
      map((response: UseCaseReponse<T>) => {
        const http = context.switchToHttp();
        const res = http.getResponse<Response>();

        if (!response || typeof response.success !== 'boolean') {
          return response;
        }

        // Map success
        if (response.success) {
          switch (response.type) {
            case SuccessType.CREATED:
              res.status(201);
              break;
            case SuccessType.NO_CONTENT:
              res.status(204);
              break;
            default:
              res.status(200);
              break;
          }
        } else {
          // Map failure
          switch (response.type) {
            case ErrorType.VALIDATION:
              res.status(400);
              break;
            case ErrorType.UNAUTHORIZED:
              res.status(401);
              break;
            case ErrorType.FORBIDDEN:
              res.status(403);
              break;
            case ErrorType.NOT_FOUND:
              res.status(404);
              break;
            case ErrorType.CONFLICT:
              res.status(409);
              break;
            case ErrorType.INTERNAL:
            default:
              res.status(500);
              break;
          }
        }

        const { type: _type, ...rest } = response;
        return rest;
      }),
    );
  }
}
