import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from '../dto/create.dto';
import { LikesRepositoryService } from './likes-repository.service';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepositoryService: LikesRepositoryService,
  ) {}

  public async addLike(createLikeDto: CreateLikeDto) {
    return await this.likesRepositoryService.addLike(createLikeDto);
  }

  public async removeLike(id: string) {
    return await this.likesRepositoryService.removeLike(id);
  }
}
