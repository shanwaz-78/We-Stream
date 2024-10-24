import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import {ExtractJwt, Strategy} from "passport-jwt"
import { UsersService } from "src/users/users.service";

@Injectable()
export class PassportJWTStrategy extends PassportStrategy(Strategy){
    constructor(private userService:UsersService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: 'asif123',
        })
    }

    async validate(payload:any){
        const user = await this.userService.findByEmail(payload.email); 
        return {...user, userId : payload.sub};
    }
}