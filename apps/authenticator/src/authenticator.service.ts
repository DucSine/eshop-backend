import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SignInLocalDto, SignUpDto, ChangePasswordRequestDto, VerifiedPayloadDto } from './dto';
import { AccountRepo } from '@app/repositories';
import { UtilsService } from '@app/utils';
import { CachingService } from '@app/caching';
import { ACCOUNT_STATUS } from '@app/common';

@Injectable()
export class AuthenticatorService {
    constructor(
        private readonly _account: AccountRepo,
        private readonly _utils: UtilsService,
        private readonly _caching: CachingService
    ) {}

    async signUp(body: SignUpDto) {
        const { username, password, email } = body;

        if (await this._account.usernameIsExist(username))
            throw new BadRequestException([{ field: 'username', message: 'USERNAME_EXIST' }]);

        if (await this._account.emailIsExist(email)) throw new BadRequestException([{ field: 'email', message: 'EMAIL_EXIST' }]);

        const account = await this._account.instance.create({
            data: {
                ...body,
                password: UtilsService.getInstance().hashValue(password)
            }
        });

        return { status: !!account };
    }

    async verifiedAccount(body) {
        const { token } = body;
        const { email, timeExpires }: VerifiedPayloadDto = UtilsService.getInstance().decryptValue(token);

        if (!(await this._account.emailIsExist(email)))
            throw new BadRequestException([{ field: 'email', message: 'EMAIL_NOT_EXIST' }]);

        if (Date.now() > timeExpires) throw new ForbiddenException([{ message: 'TOKEN_EXPIRES' }]);

        const rs = await this._account.instance.update({
            where: { email },
            data: { status: ACCOUNT_STATUS.ACTIVATED }
        });

        return { status: !!rs };
    }

    async signInLocal(body: SignInLocalDto) {
        const { username } = body;
        return this._account.instance.findUnique({
            where: { username },
            select: {
                id: true,
                password: true,
                status: true,
                role: true
            }
        });
    }

    async changePassword(body: ChangePasswordRequestDto) {
        const { id, oldPassword, newPassword } = body;

        if (oldPassword === newPassword) throw new ForbiddenException([{ field: 'password', message: 'DUPLICATE_PASSWORD' }]);

        const checkPassword = await this._account.instance.findUnique({
            where: { id },
            select: { password: true }
        });

        if (!UtilsService.getInstance().compareHash(oldPassword, checkPassword.password))
            throw new ForbiddenException([{ field: 'password', message: 'PASSWORD_INCORRECT' }]);

        const rs = await this._account.instance.update({
            where: { id },
            data: {
                password: UtilsService.getInstance().hashValue(newPassword),
                updatedAt: new Date()
            }
        });
        console.log(rs);

        return { status: !!rs };
    }

    // async forgotPassword(body) {
    //     const { email } = body;
    //     if (!(await this._account.emailIsExist(email)))
    //         throw new BadRequestException([{ field: 'email', message: 'EMAIL_NOT_EXIST' }]);

    //     const payload = {
    //         email,
    //         expiresIn: 3600 //hieu luc
    //     };
    //     const token = UtilsService.getInstance().encryptValue(payload);
    //     //send mail vs url/:token
    // }

    // async resetPassword(body) {
    //     // tao 1 request , xac nhan user, sau do reset pass
    //     const { id, password } = body;
    //     return this._account.instance.update({
    //         where: { id },
    //         data: {
    //             password: UtilsService.getInstance().hashValue(password),
    //             updatedAt: new Date()
    //         },
    //         select: {
    //             id: true,
    //             updatedAt: true
    //         }
    //     });
    // }
}

//
// const accountExist = await this._account.instance.findFirst({
//     where: { OR: [{ email }, { username }] }
// });

// if (accountExist?.email === email)
//     throw new BadRequestException([{ field: 'email', message: 'EMAIL_EXIST' }]);

// if (accountExist?.username === username)
//     throw new BadRequestException([{ field: 'username', message: 'USERNAME_EXIST' }]);
