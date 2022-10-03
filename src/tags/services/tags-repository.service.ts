import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create.dto';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsRepositoryService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  public async getAll(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  public async addTag(tag: CreateTagDto): Promise<Tag> {
    const newTag = {
      ...tag,
      createDate: Date.now().toString(),
    };
    return await this.tagsRepository.save(newTag);
  }
}
