import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create.dto';
import { CommentsService } from './services/comments.service';

@Controller('v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Comment[]> {
    return this.commentsService.getAll();
  }

  @Post('add-comment')
  @HttpCode(201)
  public async addCollectionItem(
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.addComment(comment);
  }
}
