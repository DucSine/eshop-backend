import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { IExceptionResponse } from '../interfaces';
import { getMessage } from '../messages';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as IExceptionResponse;
        const { statusCode, message, error } = exceptionResponse;

        response.status(status).json({
            statusCode,
            message: getMessage(`ERRORS.${status}`) || error,
            errors: message
        });
    }
}
