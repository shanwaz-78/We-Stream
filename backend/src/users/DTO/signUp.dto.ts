import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export class SignUpDto {
  @IsNotEmpty({ message: 'username must not be empty' })
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  username!: string;

  @IsNotEmpty({ message: 'email must not be empty' })
  @IsEmail(undefined, { message: 'please provide valid email' })
  email!: string;

  @IsNotEmpty({ message: 'please enter password' })
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
  })
  password!: string;

  @IsNotEmpty({ message: 'age must not be empty' })
  age!:number

  @IsString()
  @IsEnum(['f', 'm', 'o'])
  gender!: string;
}
