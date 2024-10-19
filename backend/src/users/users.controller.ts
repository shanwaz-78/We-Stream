import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './DTO/signUp.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("sign-up")
    createUser(@Body() userData: SignUpDto) {
        return this.usersService.createUser(userData)
    }
}
