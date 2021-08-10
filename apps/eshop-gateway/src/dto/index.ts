'use strict';

import { getMessage } from '@app/common/messages';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

// export class SignInOffice365BodyDto {
//     @ApiProperty()
//     @IsNotEmpty()
//     @IsString()
//     @IsJWT({ message: getMessage('VALIDATION.IS_JWT') })
//     readonly accessToken: string;
// }

// export class SignInOffice365Response {
//     @ApiResponseProperty({
//         example:

//     })
//     accessToken: string;

//     @ApiResponseProperty({ example: 3600 })
//     expiresIn: number;
// }

export class AccountResponse {
    @ApiResponseProperty({ example: null })
    id: string;

    @ApiResponseProperty({ example: null })
    username?: string;

    @ApiResponseProperty({ example: null })
    email?: string;

    @ApiResponseProperty({ example: 2 })
    role: number;
}

export class TokenPayloadDto {
    expiresIn: number;

    token: string;

    constructor(token: string, expiresIn: number) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI0MDA5MzU0LCJleHAiOjE3MjQwMDkzNTN9.8c_BfTzjNG71_c2imVIMkvqkioNorugf-rlXcE-t7_s'
