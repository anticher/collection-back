import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dto/create.dto';

@Injectable()
export class CommentsRepositoryService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  public async getAll(): Promise<Comment[]> {
    return await this.commentsRepository.find();
  }

  public async addComment(comment: CreateCommentDto): Promise<Comment> {
    const newComment = {
      ...comment,
      createDate: Date.now().toString(),
    };
    return await this.commentsRepository.save(newComment);
  }
}
