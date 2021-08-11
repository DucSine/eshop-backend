import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class RestaurantRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    get instance() {
        return this._client.restaurant;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
