import { ACCOUNT_STATUS, MESSAGE_PATTERN, SERVICES } from '@app/common';
import { BadRequestExceptionFilter } from '@app/common/filters/bad-request.filter';
import { GatewayHttpExceptionFilter } from '@app/common/filters/gateway-http-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { LoggingInterceptor } from '@app/common/interceptors/logging.interceptor';
import { LoggerService } from '@app/logger';
import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    HttpCode,
    HttpStatus,
    Inject,
    Patch,
    Post,
    Req,
    UseFilters,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MainValidationPipe } from './pipes/validation.pipe';
import { getMessage } from '@app/common/messages';
import {
    SignUpRequestDto,
    SignInLocalRequestDto,
    SignInLocalResponseDto,
    TokenPayloadDto,
    ChanggePasswordRequestDto,
    StatusResponseDto
} from './dto';
import { UtilsService } from '@app/utils';
import { ConfigService } from '@app/configs';
import { Public } from './decorator';
import { Request } from '@app/common/dto/RequestDto';

@ApiTags('Auth')
@UseFilters(BadRequestExceptionFilter)
@UseFilters(GatewayHttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(SERVICES.AUTHENTICATOR) private _client: ClientProxy,
        private readonly _logger: LoggerService,
        private readonly _jwtService: JwtService
    ) {
        this._logger.setContext(AuthController.name);
    }
    @Public()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign up' })
    @ApiOkResponse({ description: getMessage('GENERAL.SUCCESS'), type: StatusResponseDto })
    @UsePipes(new MainValidationPipe())
    @Post('sign-up')
    async signUp(@Body() body: SignUpRequestDto) {
        const payload = body;
        this._logger.log({
            message: `signUp - send`,
            metadata: { payload }
        });
        return this._client.send<any>(MESSAGE_PATTERN.AUTH.SIGN_UP, { ...payload }).toPromise();
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign in' })
    @ApiOkResponse({ description: getMessage('GENERAL.SUCCESS'), type: SignInLocalResponseDto })
    @UsePipes(new MainValidationPipe())
    @Post('sign-in-local')
    async signInLocal(@Body() body: SignInLocalRequestDto) {
        const payload = { username: body.username };
        const password = body.password;
        this._logger.log({ message: `signInLocal - send`, metadata: { payload } });

        const account = await this._client.send<any>(MESSAGE_PATTERN.AUTH.SIGN_IN_LOCAL, { ...payload }).toPromise();

        if (!account) throw new ForbiddenException([{ field: 'username', message: 'USERNAME_INCORRECT' }]);

        if (!UtilsService.getInstance().compareHash(password, account.password))
            throw new ForbiddenException([{ field: 'password', message: 'PASSWORD_INCORRECT' }]);

        switch (account.status) {
            case ACCOUNT_STATUS.ACTIVATED:
                return new TokenPayloadDto(
                    this._jwtService.sign({ id: account.id }),
                    ConfigService.getInstance().getNumber('INVALID_ACCESS_TOKEN')
                );
            case ACCOUNT_STATUS.DEACTIVATED:
                throw new ForbiddenException([{ field: 'account', message: 'ACCOUNT_DEACTIVATED' }]);

            case ACCOUNT_STATUS.LOCKED:
                throw new ForbiddenException([{ field: 'account', message: 'ACCOUNT_LOCKED' }]);

            default:
                throw new BadRequestException([{ field: 'error', message: 'AN ERROR OCCURRED' }]);
        }
    }

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change password' })
    @ApiOkResponse({ description: getMessage('GENERAL.SUCCESS'), type: StatusResponseDto })
    @UsePipes(new MainValidationPipe())
    @Patch('change-password')
    async changePassword(@Req() req: Request, @Body() body: ChanggePasswordRequestDto) {
        const payload = { id: req.user.id, ...body };

        this._logger.log({
            message: `changePassword - send`,
            metadata: { payload }
        });
        return this._client.send<any>(MESSAGE_PATTERN.AUTH.CHANGE_PASSWORD, { ...payload }).toPromise();
    }
}
