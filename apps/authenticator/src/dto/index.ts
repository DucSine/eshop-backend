export interface SignUpDto {
    username: string;
    password: string;
    email: string;
    role: number;
}

export class SignInLocalDto {
    username: string;
}

export class SignInFaceookRequestDto {}

export class SignInGoogleRequestDto {}

export class ChangePasswordRequestDto {
    id: string;
    oldPassword: string;
    newPassword: string;
}

export class VerifiedPayloadDto {
    email: string;
    timeExpires: number;

    constructor(email: string, timeExpires: number) {
        this.email = email;
        this.timeExpires = timeExpires;
    }
}

export class TokenPayloadDto {
    token: string;
    expiresIn: number;
}
