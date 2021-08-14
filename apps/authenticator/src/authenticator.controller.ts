import { MESSAGE_PATTERN } from '@app/common';
import { ServiceExceptionFilter } from '@app/common/filters/service-exception.filter';
import { LoggerService } from '@app/logger';
import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticatorService } from './authenticator.service';
import { ChangePasswordRequestDto, SignUpDto, SignInLocalDto } from './dto';

@UseFilters(ServiceExceptionFilter)
@Controller()
export class AuthenticatorController {
    constructor(private readonly _logger: LoggerService, private readonly _service: AuthenticatorService) {
        this._logger.setContext(AuthenticatorController.name);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.SIGN_UP)
    async signUp(@Payload() payload: SignUpDto) {
        this._logger.log({ message: `signUp - Invoked`, metadata: { payload } });
        return this._service.signUp(payload);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.VERIFIED_ACCOUNT)
    async verifiedAccount(@Payload() payload) {
        this._logger.log({ message: `verifiedAccount - Invoked`, metadata: { payload } });
        return this._service.verifiedAccount(payload);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.SIGN_IN_LOCAL)
    async signInLocal(@Payload() payload: SignInLocalDto) {
        this._logger.log({ message: `signInLocal - Invoked`, metadata: { payload } });
        return this._service.signInLocal(payload);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.CHANGE_PASSWORD)
    async changePassword(@Payload() payload: ChangePasswordRequestDto) {
        this._logger.log(`changePassword - Invoked`);
        return this._service.changePassword(payload);
    }

    // @MessagePattern(MESSAGE_PATTERN.AUTH.FORGOT_PASSWORD)
    // async forgotPassword(@Payload() payload) {
    //     this._logger.log(`forgotPassword - Invoked`);
    //     return this._service.forgotPassword(payload);
    // }

    // @MessagePattern(MESSAGE_PATTERN.AUTH.RESET_PASSWORD)
    // async resetPassword(@Payload() payload) {
    //     this._logger.log(`resetPassword - Invoked`);
    //     return this._service.resetPassword(payload);
    // }
}
