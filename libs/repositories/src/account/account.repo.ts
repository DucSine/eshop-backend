import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class AccountRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    get instance() {
        return this._client.account;
    }

    /**
     * Check username is exist
     *
     * @param username
     * @returns boolean
     */
    async usernameIsExist(username: string): Promise<boolean> {
        const rs = await this._client.account.findFirst({
            where: { username }
        });
        return !!rs;
    }

    /**
     * Check email is exist
     *
     * @param email
     * @returns boolean
     */
    async emailIsExist(email: string): Promise<boolean> {
        const rs = await this._client.account.findFirst({
            where: { email }
        });
        return !!rs;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
