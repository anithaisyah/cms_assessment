import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async signIn(username:string, pass: string):Promise<AuthResponse | null> {
        const user = await this.userService.findOne({username});
        if(user && await bcrypt.compare(pass, user.password)){
            const {password, ...result} = user;
            const payload = {username: user.username, sub: user.id};
            const token = this.jwtService.sign(payload);
            return {
                token,
                user: result,
            };
        } else{
            throw new Error('Invalid Credentials');
        }

    }
}
