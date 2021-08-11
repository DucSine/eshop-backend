'use strict';

export interface IAwsConfig {
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
}

export interface IApiFile {
    name: string;
    isArray?: boolean;
}

export interface IFile {
    encoding: string;
    buffer: Buffer;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
}

export interface ITranslationDecoratorInterface {
    translationKey: string;
}

export interface IExceptionResponse {
    statusCode: number;
    message?: any;
    error: string;
}
