import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { AppModule } from './app.module';

const logger = new Logger(`Eshop-Main`);

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.enable(`trust proxy`);

    const port = 3000;
    await app.listen(port, () => logger.log(`Eshop-Main is running at http://localhost:${port}`));
}
bootstrap();
