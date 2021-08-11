import { Module } from '@nestjs/common';
import { BillDetailRepo } from './bill-detail.repo';

@Module({
    providers: [BillDetailRepo],
    exports: [BillDetailRepo]
})
export class BillDetailModule {}
