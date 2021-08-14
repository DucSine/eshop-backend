import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CustomerModule } from './customer/customer.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [CustomerModule, ShopModule],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
