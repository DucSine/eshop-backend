import { Request } from '@app/common/dto/RequestDto';
import { LoggerService } from '@app/logger';
import { UtilsService } from '@app/utils';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly _utils: UtilsService, private readonly _logger: LoggerService) {
        this._logger.setContext(LoggingInterceptor.name);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const now = this._utils.getDate();

        this.attachRequestUniqueIdentifier(req);

        const traceId = req.id;
        const requestMetadata = this.getRequestMetadata(req);
        this._logger.log({ message: 'Request', metadata: { traceId, payload: requestMetadata } });

        return next.handle().pipe(
            tap((data) => {
                const responseMetadata = this.getResponseMetadata(res);
                const responseTime = this._utils.getDate().diff(now);
                this._logger.log({ message: 'Response', metadata: { traceId, payload: { ...responseMetadata, responseTime } } });
            })
        );
    }

    private getResponseMetadata(res: Response) {
        const statusCode = res.statusCode;
        const headers = res.getHeaders();
        return { statusCode, headers };
    }

    private getRequestMetadata(req: Request) {
        const { method, url, headers } = req;
        return { method, url, headers };
    }

    private attachRequestUniqueIdentifier(req: Request) {
        req.id = nanoid();
    }
}
