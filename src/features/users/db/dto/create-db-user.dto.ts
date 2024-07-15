import {
    IsEmail,
    IsString,
} from 'class-validator';


export class CreateUserDto {
    @IsString({ message: 'necessary value for firstname' })
    name: string;
    @IsString()
    phoneNumber: string;
    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;
}
