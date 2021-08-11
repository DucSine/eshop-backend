import { DEFAULT_PAGE_LIMIT } from '@app/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Account } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    id: string;
    user: Account;
}

export interface Request extends ExpressRequest {
    user: Account;
}
export class RequestPayload<TUser = any, TParams = any, TQuery = any, TBody = any> {
    traceId: string;
    user?: Account & TUser;
    param?: TParams;
    query?: TQuery;
    body?: TBody;
}

export class IDParam {
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    id: number;
}

export class PaginationQuery {
    @ApiPropertyOptional({ example: 1 })
    @Expose()
    @Transform(({ value }) => value || 1)
    @IsOptional()
    @IsInt()
    @IsPositive()
    page: number;

    @Expose()
    get take() {
        return DEFAULT_PAGE_LIMIT;
    }

    @Expose()
    get skip() {
        return (+this.page - 1) * this.take;
    }
}
