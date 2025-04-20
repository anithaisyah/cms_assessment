import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthResolver } from "./auth.resolver";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'anith aisyah',
            signOptions: {expiresIn: '60m'}
        })
    ],
    providers: [
        AuthService,
        AuthResolver,
        JwtStrategy,
    ],
    exports: [AuthService]
})
export class AuthModule{}