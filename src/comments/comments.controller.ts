import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { Actions } from 'src/casl/actions.enum';
import { Collection } from 'src/collections/collection.entity';
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
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Actions.Create, subject: Collection })
  @HttpCode(201)
  public async addCollectionItem(
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.addComment(comment);
  }
}
