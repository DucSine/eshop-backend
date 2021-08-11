import { Request } from '@app/common/dto/RequestDto';
import { getMessage } from '@app/common/messages';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        let { statusCode } = res;
        let message = getMessage(`HTTP_CODE.${statusCode}`);

        return next.handle().pipe(
            map((data) => {
                const { error } = data;
                if (error) {
                    statusCode = error.statusCode;
                    message = error.error
                        ? error.message
                        : getMessage(`HTTP_CODE.${error.statusCode}`) || error.error || error.message;
                    res.status(statusCode);
                    return {
                        statusCode,
                        message,
                        traceId: error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? req.id : undefined
                    };
                }
                // Additional transform here
                return {
                    statusCode,
                    message,
                    data
                };
            })
        );
    }
}
