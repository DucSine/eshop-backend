import { ConfigService } from '@app/configs';
import { Injectable } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class CachingService {
    private readonly _redisClient: RedisClient;

    constructor() {
        this._redisClient = createClient({
            host: ConfigService.getInstance().get('REDIS_HOST'),
            port: ConfigService.getInstance().getNumber('REDIS_PORT'),
            auth_pass: ConfigService.getInstance().get('REDIS_PASS'),
            no_ready_check: true
        });
    }

    async get<T>(key: string) {
        return new Promise<T>((resolve, reject) => {
            this._redisClient.get(key, (err, value) => (err ? reject(err) : resolve(JSON.parse(value) as T)));
        });
    }

    async set(key: string, value: unknown, exp?: number) {
        if (value === undefined || value === null) return;
        return new Promise((resolve, reject) => {
            const valStr = JSON.stringify(value);
            if (exp) {
                this._redisClient.setex(key, exp, valStr, (err) => (err ? reject(err) : resolve(true)));
            } else {
                this._redisClient.set(key, valStr, (err) => (err ? reject(err) : resolve(true)));
            }
        });
    }

    async remove(key: string) {
        return this._redisClient.del(key);
    }
}
