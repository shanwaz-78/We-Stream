import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../users/DTO/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(userData: SignUpDto) {
        return await this.userService.createUser(userData)
    }
}
