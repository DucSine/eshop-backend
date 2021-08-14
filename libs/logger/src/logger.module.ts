import { ConfigService } from '@app/configs';
import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-mongodb';
import { LoggerService } from './logger.service';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike()
                    )
                }),
                new winston.transports.MongoDB({
                    name: 'info',
                    db: ConfigService.getInstance().get('DATABASE_URL'),
                    collection: ConfigService.getInstance().get('LOGGER_COLLECTION_NAME'),
                    storeHost: true,
                    options: { useUnifiedTopology: true }
                })
            ],
            exceptionHandlers: [new winston.transports.Console()]
        })
    ],
    providers: [LoggerService],
    exports: [LoggerService]
})
export class LoggerModule {}
