import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return JSON.stringify(`Removed user #${id}`);
  }
}
