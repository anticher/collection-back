import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create.dto';
import { CommentsService } from './services/comments.service';

@Controller('v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @HttpCode(200)
  public async getAll(): Promise<Comment[]> {
    return await this.commentsService.getAll();
  }

  @Get('by-collection-item-id/:id')
  @HttpCode(200)
  public async getByCollectionItemId(
    @Param('id') id: string,
  ): Promise<Comment[]> {
    return await this.commentsService.getByCollectionItemId(id);
  }

  @Post('add-comment')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async addComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<string> {
    return await this.commentsService.addComment(createCommentDto);
  }
}
