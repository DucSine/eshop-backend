import { LoggerService } from '@app/logger';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ServiceExceptionFilter implements ExceptionFilter {
    constructor(private readonly _logger: LoggerService) {
        this._logger.setContext(ServiceExceptionFilter.name);
    }

    catch(exception: Error, host: ArgumentsHost) {
        if (
            !(exception instanceof HttpException) ||
            (exception instanceof HttpException && exception.getResponse()['statusCode'] === HttpStatus.INTERNAL_SERVER_ERROR)
        ) {
            const traceId = host.getArgByIndex(0)['traceId'];
            this._logger.error({ message: exception.name, metadata: { traceId, exception } }, exception.stack);
        }

        return new RpcException(
            exception instanceof HttpException
                ? exception.getResponse()
                : { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: exception.name }
        );
    }
}
