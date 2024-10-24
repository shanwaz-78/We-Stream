import { Injectable, BadRequestException } from '@nestjs/common';
import { SignUpDto } from '../users/DTO/signUp.dto';
import { SigninDTO } from '../users/DTO/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: SignUpDto) {
    return await this.userService.createUser(userData);
  }

  async signIn(loginCredentials: SigninDTO) {
    const user = await this.userService.loginUser(loginCredentials);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.user_id }; 
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
