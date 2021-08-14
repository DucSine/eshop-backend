'use strict';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class SignUpRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 10)
    @ApiProperty({ example: 'ducsine' })
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    @ApiProperty({ example: 'duc@123' })
    readonly password: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'FORM.EMAIL' })
    @ApiProperty({ example: 'duc@email.com' })
    readonly email: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(3)
    @ApiProperty({ example: 1 })
    readonly role: number;
}

export class SignInLocalRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 10)
    @ApiProperty({ example: 'ducsine' })
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    @ApiProperty({ example: 'duc@123' })
    readonly password: string;
}

export class SignInLocalResponseDto {
    @ApiResponseProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI0MDA5MzU0LCJleHAiOjE3MjQwMDkzNTN9.8c_BfTzjNG71_c2imVIMkvqkioNorugf-rlXcE-t7_s'
    })
    readonly token: string;

    @ApiResponseProperty({ example: 3600 })
    readonly expiresIn: number;
}

export class ChanggePasswordRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    @ApiProperty({ example: 'duc@123' })
    readonly oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 12)
    @ApiProperty({ example: 'duc@sine' })
    readonly newPassword: string;
}

export class StatusResponseDto {
    @ApiResponseProperty({ example: true })
    readonly status?: boolean;
}

export class AccountResponse {
    @ApiResponseProperty({ example: '6115e18600fc5ca4004adb49' })
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
//'
