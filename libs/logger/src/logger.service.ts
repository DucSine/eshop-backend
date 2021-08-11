import { Inject, Injectable, Scope } from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

type Message = {
    message: string;
    metadata?: {
        traceId: string;
        context?: string;
        payload?: Record<string, any>;
        exception?: Record<string, any>;
    };
};

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private _context = 'LoggerService';

    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly _logger: WinstonLogger) {}

    public setContext(context: string) {
        this._context = context;
    }

    public log(message: string | Message) {
        if (typeof message === 'object') {
            message.metadata.context = this._context;
        }
        this._logger.log(message, this._context);
    }

    public error(message: string | Message, trace: string) {
        if (typeof message === 'object') {
            message.metadata.context = this._context;
        }
        this._logger.error(message, trace, this._context);
    }
}
