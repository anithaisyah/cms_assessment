import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserProfileService } from "./userprofile.service";
import { UserProfileResolver } from "./userprofile.resolver";
import { PrismaService } from "src/prisma.service";
import { PostModule } from "src/post/post.module";
import { PostService } from "src/post/post.service";

@Module({
    imports: [],
    providers: [
        PrismaService,
        UserService,
        UserResolver,
        UserProfileService,
        UserProfileResolver,
        PostService
    ],
    exports: [
        UserService,
        UserProfileService,
    ],
})
export class UserModule{}