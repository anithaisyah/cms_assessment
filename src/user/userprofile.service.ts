import { Injectable } from '@nestjs/common';
import { UserProfile } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async userProfile(userId: number): Promise<UserProfile | null> {
    return this.prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });
  }

  async delete(userId: number): Promise<UserProfile>{
    return this.prisma.userProfile.delete({
        where:{
            userId
        }
    });
  }
}
