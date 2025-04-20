import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import { UserProfileService } from './userprofile.service';
import * as bcrypt from 'bcryptjs';
import { AuthUser } from 'src/auth/user.decorator';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userProfileService: UserProfileService,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserInput): Promise<User> {
    const { password, name, phone, ...info } = data;
    const encrypted = await bcrypt.hash(password, 10);

    // if (!name) {
    //   throw new Error('Name is required to create user profile');
    // }

    const user = await this.prisma.user.create({
      data: {
        password: encrypted,
        ...info,
        userProfile: {
          create: {
            name,
            phone,
          },
        },
      },
    });

    return user;
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const { username, email, name, phone } = data;

    return this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        userProfile:{
          update:{
            name,
            phone,
          }
        }
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async posts(authorId: number) {
    return this.prisma.post.findMany({
      where: {
        authorId,
      },
    });
  }

  async userProfile(userId: number) {
    return this.userProfileService.userProfile(userId);
  }
}
