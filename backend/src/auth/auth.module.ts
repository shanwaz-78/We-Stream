import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PassportJWTStrategy } from './Strategy/PassportJWT.Strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'asif123',
            signOptions: {
                expiresIn: '1h'
            }
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, PassportJWTStrategy]
})
export class AuthModule { }
