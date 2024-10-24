import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/DTO/signUp.dto';
import { SigninDTO } from 'src/users/DTO/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    signUp(@Body() userData: SignUpDto) {
        return this.authService.signUp(userData)
    }

    @Post('sign-in')
    signIn(@Body() loginCredentials : SigninDTO){
        return this.authService.signIn(loginCredentials)
    }
}
