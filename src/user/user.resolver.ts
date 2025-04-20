import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserProfileService } from './userprofile.service';
import { User } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { CreateUserInput, UpdateUserInput } from './dto/create-user.input';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}

  @ResolveField('posts')
  async posts(@Parent() user: User) {
    return this.userService.posts(user.id);
  }

  @ResolveField('userProfile')
  async userProfile(@Parent() user: User) {
    return this.userService.userProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query('me')
  async me(@AuthUser() user: User) {
    return this.userService.findById(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query('user')
  async user(@Args('id') id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query('users')
  async users() {
    return this.userService.findAll();
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateUser')
  async updateUser(
    @Args('input') data: UpdateUserInput,
    @AuthUser() user: User,
  ) {
    return this.userService.update(user.id, data);
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: number) {
    this.userProfileService.delete(id);
    return this.userService.delete(id);
  }
}
