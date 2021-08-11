import { Module } from '@nestjs/common';
import { RateRepo } from './rate.repo';

@Module({
    providers: [RateRepo],
    exports: [RateRepo]
})
export class RateModule {}
