import { Global, Module } from '@nestjs/common';
import { CommonConstants } from './constants';
import { DECORATOR } from './decorators';

@Global()
@Module({
    providers: [CommonConstants, DECORATOR],
    exports: [CommonConstants, DECORATOR]
})
export class CommonModule {}
