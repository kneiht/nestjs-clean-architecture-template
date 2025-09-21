import { Body, Controller, Get, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, Post } from '@/entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Post[] {
    return [
      Post.create({
        title: 'new title 1',
        content: 'new content 1',
      }),
      Post.create({
        title: 'new title 2',
        content: 'new content 2',
      }),
    ];
  }

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto): Post {
    const post = Post.create(createPostDto);
    return post;
  }
}
