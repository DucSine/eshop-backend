import { Module } from '@nestjs/common';
import { CustomerRepo } from './customer.repo';

@Module({
    providers: [CustomerRepo],
    exports: [CustomerRepo]
})
export class CustomerModule {}
