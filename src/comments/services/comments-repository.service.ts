import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/user.entity';
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

  public async getByCollectionItemId(id: string): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: {
        itemId: id,
      },
      relations: {
        item: true,
        user: true,
      },
      order: { createDate: 'ASC' },
    });
  }

  public async addComment(createCommentDto: CreateCommentDto): Promise<string> {
    const { userId, message, itemId } = createCommentDto;
    const result = await this.commentsRepository
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values([
        { message, userId: userId, itemId, createDate: Date.now().toString() },
      ])
      .execute();
    return result.identifiers[0].id;
  }
}
