import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/DTO/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    signUp(@Body() userData: SignUpDto) {
        return this.authService.signUp(userData)
    }
}
