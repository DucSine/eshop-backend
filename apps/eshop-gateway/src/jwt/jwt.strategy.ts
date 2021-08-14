import { ConfigService } from '@app/configs';
import { AccountRepo } from '@app/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _account: AccountRepo) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ConfigService.getInstance().get('JWT_SECRET_KEY')
        });
    }

    async validate({ id }) {
        const account = await this._account.instance.findUnique({
            where: { id },
            include: {
                Restaurant: true,
                Customer: true
            }
        });

        if (!account) {
            throw new UnauthorizedException();
        }
        return account;
    }
}
