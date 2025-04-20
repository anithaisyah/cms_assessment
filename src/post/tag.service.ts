import { Injectable } from '@nestjs/common';
import { Tag, TagInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
    constructor(
            private prisma: PrismaService
        ){}
    
        async findById(id: number): Promise<Tag|null> {
            return this.prisma.tag.findUnique({
                where: {
                    id
                }
            });
        }
    
        async findAll(): Promise<Tag[]> {
            return this.prisma.tag.findMany();
        }
    
        async create(data: TagInput): Promise<Tag> {
            return this.prisma.tag.create({data});
        }
    
        async update(id: number, data: TagInput): Promise<Tag> {
            return this.prisma.tag.update({
                where: {
                    id
                },
                data
            });
        }
    
        async delete(id:number ): Promise<Tag> {
            return this.prisma.tag.delete({
                where:{id}
            });
        }
}
