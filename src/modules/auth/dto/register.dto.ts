import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { IsPasswordStrong } from '../../../common/constraints/password.constraint';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 40)
  @Validate(IsPasswordStrong)
  password: string;
}
