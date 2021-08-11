import { Module } from '@nestjs/common';
import { OptionsRepo } from './options.repo';

@Module({
    providers: [OptionsRepo],
    exports: [OptionsRepo]
})
export class OptionsModule {}
