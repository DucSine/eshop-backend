import { Module } from '@nestjs/common';
import { GoodsRepo } from './goods.repo';

@Module({
    providers: [GoodsRepo],
    exports: [GoodsRepo]
})
export class GoodsModule {}
