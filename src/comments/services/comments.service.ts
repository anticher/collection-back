import { Injectable } from '@nestjs/common';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dto/create.dto';
import { CommentsRepositoryService } from './comments-repository.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepositoryService: CommentsRepositoryService,
  ) {}

  public async getAll(): Promise<Comment[]> {
    return await this.commentsRepositoryService.getAll();
  }

  public async addComment(comment: CreateCommentDto): Promise<Comment> {
    return await this.commentsRepositoryService.addComment(comment);
  }
}
