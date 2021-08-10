import { SERVICES } from '@app/common';
import { ConfigService } from '@app/configs';
import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export function createClientProxies(): Provider[] {
    return [
        {
            provide: SERVICES.AUTHENTICATOR,
            useFactory: () =>
                ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: ConfigService.getInstance().get('AUTHENTICATOR_HOST'),
                        port: ConfigService.getInstance().getNumber('AUTHENTICATOR_PORT')
                    }
                })
        }
    ];
}
