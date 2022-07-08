import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput) {
    const post = await this.prisma.post.create({
      data,
    });
    return post;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async findOne(id: string) {
    const posts = await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    return posts;
  }

  async remove(id: string) {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return JSON.stringify(`Removed post #${id}`);
  }
}
