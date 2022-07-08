import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body()
    postData: {
      title: string;
      content: string;
      published: boolean;
      authorId: string;
    },
  ) {
    const { title, content, published, authorId } = postData;
    return this.postsService.create({
      title,
      content,
      published,
      author: {
        connect: { id: authorId },
      },
    });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
