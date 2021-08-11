import { Module } from '@nestjs/common';
import { CartRepo } from './cart.repo';

@Module({
    providers: [CartRepo],
    exports: [CartRepo]
})
export class CartModule {}
