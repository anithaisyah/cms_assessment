import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
      const user = GqlExecutionContext.create(ctx).getContext().req.user;
      console.log(user);
      return user;
    }
);
