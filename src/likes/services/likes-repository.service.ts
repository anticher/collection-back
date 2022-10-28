import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from '../dto/create.dto';
import { Like } from '../like.entity';

@Injectable()
export class LikesRepositoryService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}
  public async addLike(createLikeDto: CreateLikeDto) {
    const { userId, itemId } = createLikeDto;
    const result = await this.likesRepository
      .createQueryBuilder()
      .insert()
      .into(Like)
      .values([{ userId, itemId, createDate: Date.now().toString() }])
      .execute();
    return { id: result.identifiers[0].id };
  }

  public async removeLike(id: string) {
    const result = await this.likesRepository.delete(id);
    return result;
  }
}
