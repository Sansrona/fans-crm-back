import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {emailValidatorRegexp, passwordValidatorRegexp} from "../../../../common/constants/validations";
import {userPasswordConstants} from "../../../../common/constants/validation.constants";


export class CreateUserDto {
    @IsString({ message: 'necessary value for firstname' })
    @ApiProperty({
        description: 'user firstname',
        example: 'Вася',
        required: true,
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'user phone number',
        example: '+12345678901',
        required: true,
    })
    phoneNumber: string;
    @IsEmail()
    @ApiProperty({
        description: 'user email',
        example: 'example@gmail.com',
        required: true,
    })
    @Matches(emailValidatorRegexp)
    email: string;

    @IsString()
    @MinLength(userPasswordConstants.min)
    @MaxLength(userPasswordConstants.max)
    @Matches(passwordValidatorRegexp)
    @ApiProperty({
        description: 'user password',
        example: 'Pa$$w0rD',
        required: true,
    })
    password: string;
}
