import { CachingModule } from '@app/caching';
import { LoggerModule } from '@app/logger';
import { AccountModule } from '@app/repositories';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { AuthenticatorController } from './authenticator.controller';
import { AuthenticatorService } from './authenticator.service';

@Module({
    imports: [LoggerModule, AccountModule, UtilsModule, CachingModule],
    controllers: [AuthenticatorController],
    providers: [AuthenticatorService]
})
export class AuthenticatorModule {}
