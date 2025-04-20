import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostResolver } from "./post.resolver";
import { TagService } from "./tag.service";
import { TagResolver } from "./tag.resolver";
import { PrismaService } from "src/prisma.service";
import { UserModule } from "src/user/user.module";
import { PostTagResolver } from "./post-tag.resolver";

@Module({
    imports: [UserModule],
    providers: [
        PrismaService,
        PostService,
        PostResolver,
        TagService,
        TagResolver,
        PostTagResolver,
    ],
    exports: [
        PostService,
        TagService,
        PostTagResolver,
        TagResolver,
    ],
})
export class PostModule{}