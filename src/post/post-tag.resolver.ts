import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostTag, Tag } from "generated/prisma";
import { PrismaService } from "src/prisma.service";

@Resolver('PostTag')
export class PostTagResolver{
    constructor(private prisma : PrismaService){}
    @ResolveField('tag')
    async tag(@Parent() postTag: PostTag): Promise<Tag|null>{
        return this.prisma.tag.findFirst({where:{id:postTag.tagId}});
    }
}