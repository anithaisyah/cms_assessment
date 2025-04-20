import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: { DATETIME: GraphQLISODateTime },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: "class",
      },
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
  // controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
