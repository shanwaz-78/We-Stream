import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDTO {
  @IsEmail(undefined, { message: 'Email must be provided' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email!: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  password!: string;
}
