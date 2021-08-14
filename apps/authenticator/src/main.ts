import { ConfigService } from '@app/configs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AuthenticatorModule } from './authenticator.module';

const logger = new Logger(`Eshop-Authenticator`);

const opts: TcpOptions = {
    transport: Transport.TCP,
    options: {
        host: ConfigService.getInstance().get('AUTHENTICATOR_HOST'),
        port: ConfigService.getInstance().getNumber('AUTHENTICATOR_PORT')
    }
};

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AuthenticatorModule, opts);
    await app.listen();
    logger.log(`Eshop-Authenticator is running at ${opts.options.host}:${opts.options.port}`);
}

bootstrap();
