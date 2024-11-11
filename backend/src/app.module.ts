import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/Entity/user.entity';
import { UsersModule } from './users/users.module';
import { ScheduleStreamModule } from './scheduleStream/stream.module';
import { ScheduleStream } from './scheduleStream/Entity/stream.entity';
import * as dotenv from 'dotenv'
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      entities: [Users, ScheduleStream],
      password: process.env.DB_Password,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    ScheduleStreamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
