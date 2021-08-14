import { Controller, Get } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller()
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  getHello(): string {
    return this.goodsService.getHello();
  }
}
