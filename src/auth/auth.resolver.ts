import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation('signIn')
  async signIn(
    @Args('username') username: string,
    @Args('pass') password: string,
  ) {
    return this.authService.signIn(username, password);
  }
}
