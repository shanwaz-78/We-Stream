import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './DTO/signUp.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Users } from './Entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    ) { }

    async createUser(userData: SignUpDto) {
        const { password, ...Data } = userData

        const user = await this.userRepo.findOneBy({ username: Data.username })

        if (user) {
            throw new BadRequestException("username already exists, user another username")
        }

        const user_email = await this.userRepo.findOneBy({ email: Data.email })
        if (user_email) {
            throw new BadRequestException("email already exists, user another email")
        }

        const hashPass = await bcrypt.hash(password, 10)

        const createUser = await this.userRepo.create({ password: hashPass, ...Data })
        return await this.userRepo.save(createUser)
    }

    async findByUsername(username: string) {
        return await this.userRepo.findOne({ where: { username } })
    }
}
