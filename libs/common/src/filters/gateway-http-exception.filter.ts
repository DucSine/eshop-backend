import { Request } from '@app/common/dto/RequestDto';
import { LoggerService } from '@app/logger';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IExceptionResponse } from '../interfaces';
import { getMessage } from '../messages';

@Catch(HttpException)
export class GatewayHttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly _logger: LoggerService) {
        this._logger.setContext(GatewayHttpExceptionFilter.name);
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as IExceptionResponse;
        const { statusCode, message, error } = exceptionResponse;
        const traceId = request.id;

        this._logger.error({ message: exception.name, metadata: { exception } }, exception.stack);

        response.status(status).json({
            statusCode,
            message: error ? message : getMessage(`HTTP_CODE.${status}`) || error || message
        });
    }
}
