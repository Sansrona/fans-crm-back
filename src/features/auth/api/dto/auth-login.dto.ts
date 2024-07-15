import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userPasswordConstants } from '../../utils/constants';
import {
  emailValidatorRegexp,
  passwordValidatorRegexp,
} from '../../../../common/constants/validations';

export class AuthLoginDto {
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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'remember me',
    example: false,
    required: false,
  })
  rememberMe: boolean;
}
