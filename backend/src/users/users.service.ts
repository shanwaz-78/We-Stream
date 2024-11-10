import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './DTO/signUp.dto';
import * as bcrypt from 'bcrypt';
import { Users } from './Entity/user.entity';
import { SigninDTO } from './DTO/signIn.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async createUser(userData: SignUpDto) {
    try {
      const { password, ...Data } = userData;

      const user = await this.findByUsername(Data.username);
      if (user) {
        throw new BadRequestException('Username already exists');
      }

      const user_email = await this.findByEmail(Data.email);
      if (user_email) {
        throw new BadRequestException('Email already exists');
      }

      const hashPass = await bcrypt.hash(password, 10);

      const createUser = this.userRepo.create({
        password: hashPass,
        ...Data,
      });

      await this.userRepo.save(createUser);

      return { message: `Register Successfully`, createdUser: createUser };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }

  async loginUser(loginCredentials: SigninDTO) {
    try {
      const { email, password } = loginCredentials;

      const isUserRegistered = await this.findByEmail(email);
      if (!isUserRegistered) {
        throw new BadRequestException('Invalid email or password');
      }

      const isUserValid = await bcrypt.compare(
        password,
        isUserRegistered.password,
      );

      if (!isUserValid) {
        throw new BadRequestException('Invalid email or password');
      }

      return isUserRegistered;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to login user');
      }
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.userRepo.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by username');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepo.findOneBy({ email });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }
}
