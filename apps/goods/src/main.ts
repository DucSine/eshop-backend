import { ConfigService } from '@app/configs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { GoodsModule } from './goods.module';

const logger = new Logger('Eshop - Goods');

const opts: TcpOptions = {
    transport: Transport.TCP,
    options: {
        host: ConfigService.getInstance().get('GOODS_HOST'),
        port: ConfigService.getInstance().getNumber('GOODS_PORT')
    }
};

async function bootstrap() {
    const app = await NestFactory.createMicroservice(GoodsModule, opts);
    await app.listen();
    logger.log(`Eshop - Goods is running at ${opts.options.host}:${opts.options.port}`);
}

bootstrap();
