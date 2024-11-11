import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UsersService } from "src/users/users.service";
import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') })

@Injectable()
export class PassportJWTStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        })
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        return { ...user, userId: payload.sub };
    }
}