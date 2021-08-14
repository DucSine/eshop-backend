import { Injectable } from '@nestjs/common';

@Injectable()
export class GoodsService {
  getHello(): string {
    return 'Hello World!';
  }
}
