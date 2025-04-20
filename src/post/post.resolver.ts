import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { Post, PostInput, User } from 'src/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { Prisma } from 'generated/prisma';
// import { PostInput } from 'src/user/dto/create-user.input';

@Resolver('Post')
export class PostResolver {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @ResolveField('author')
  async user(@Parent() post: Post) {
    const { authorId } = post;
    return this.userService.findById(authorId);
  }
  @ResolveField('tags')
  async tags(@Parent() post: Post) {
    return post.tags;
  }

  @UseGuards(JwtAuthGuard)
  @Query('post')
  async post(@Args('id') id: number) {
    return this.postService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Query('posts')
  async posts(@Args('input') input: Prisma.PostWhereInput) {
    return this.postService.findAll(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('createPost')
  async createPost(@Args('input') input: PostInput, @AuthUser() user: User) {
    return this.postService.create(input, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updatePost')
  async updatePost(
    @Args('id') id: number,
    @Args('input') input: PostInput,
    @AuthUser() user: User,
  ) {
    this.checkPostAuthor(id, user);
    return this.postService.update(id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('deletePost')
  async deletePost(@Args('id') id: number, @AuthUser() user: User) {
    this.checkPostAuthor(id, user);
    return this.postService.delete(id);
  }

  private async checkPostAuthor(id: number, user: User){
    this.postService.findById(id).then((post) => {
      if (post?.authorId !== user.id) {
        throw new UnauthorizedException();
      }
    });
  }
}
