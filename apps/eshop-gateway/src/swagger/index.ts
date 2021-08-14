export const setupSwagger = async (app: any) => {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const { version } = await import('../../../../package.json');

    const options = new DocumentBuilder()
        .setTitle('Eshop API')
        .setDescription('CAUTION: This document is for internal use only')
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
};
