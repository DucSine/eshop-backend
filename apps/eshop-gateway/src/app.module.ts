import { CachingModule } from '@app/caching';
import { ConfigService } from '@app/configs';
import { LoggerModule } from '@app/logger';
import { AccountModule } from '@app/repositories';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtRolesAuthGuard } from './jwt/jwt-roles.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { createClientProxies } from './providers/services.providers';

@Module({
    imports: [
        UtilsModule,
        LoggerModule,
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: ConfigService.getInstance().get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: ConfigService.getInstance().getNumber('JWT_EXPIRATION_TIME') }
                };
            }
        }),
        AccountModule,
        CachingModule
    ],
    controllers: [AuthController],
    providers: [...createClientProxies(), JwtStrategy, { provide: APP_GUARD, useClass: JwtRolesAuthGuard }],
    exports: []
})
export class AppModule {}
