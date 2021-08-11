import { Module } from '@nestjs/common';
import { BillRepo } from './bill.repo';

@Module({
    providers: [BillRepo],
    exports: [BillRepo]
})
export class BillModule {}
