import { Module } from '@nestjs/common';
import { CartDetailRepo } from './cart-detail.repo';

@Module({
    providers: [CartDetailRepo],
    exports: [CartDetailRepo]
})
export class CartDetailModule {}
