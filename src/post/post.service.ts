import { Injectable } from '@nestjs/common';
import { Post, Prisma, Tag} from 'generated/prisma';
import { PostInput, User } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: true
      }
    });
  }

  async findAll(where: Prisma.PostWhereInput): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        published: true,
        ...where,
      },
      include: {
        tags: true
      }
    });
  }

  async create(data: PostInput, id: number): Promise<Post> {
    let tagIds: any = [];
    data.tags?.forEach((id: number) => {
        let tag = {
                tagId:id
        };
        tagIds.push(tag);
    });
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        author: {
            connect: {
                id
            }
        },
        tags: {
            create: tagIds
        }
        ,
      },
    });
  }

  async update(id: number, data: PostInput): Promise<Post> {
    let tagIds: any = [];
    data.tags?.forEach((id: number) => {
        let tag = {
            tagId: id
        };
      tagIds.push(tag);
    });
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        tags: {
          create: tagIds,
        },
      },
    });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async tags(id: number): Promise<any> {
    const post = this.prisma.post.findFirst({ where: { id } });
  }
}

// return post.tags();
