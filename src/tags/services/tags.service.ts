import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create.dto';
import { Tag } from '../tag.entity';
import { TagsRepositoryService } from './tags-repository.service';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepositoryService: TagsRepositoryService) {}

  public async getAll(): Promise<Tag[]> {
    return await this.tagsRepositoryService.getAll();
  }

  public async addTag(tag: CreateTagDto): Promise<Tag> {
    return await this.tagsRepositoryService.addTag(tag);
  }
}