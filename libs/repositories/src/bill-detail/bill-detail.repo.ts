import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class BillDetailRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    get instance() {
        return this._client.billDetail;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
