import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './DTO/signUp.dto';
import { SigninDTO } from './DTO/signIn.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  createUser(@Body() userData: SignUpDto) {
    return this.usersService.createUser(userData);
  }

  @Post('sign-in')
  loginUser(@Body() loginCredentials: SigninDTO) {
    return this.usersService.loginUser(loginCredentials);
  }
}
