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
    return await this.tagsRepository.find({
      order: { name: 'ASC' },
    });
  }

  public async getOneByName(name: string): Promise<Tag> {
    return await this.tagsRepository.findOne({
      where: {
        name,
      },
      relations: {
        collectionItems: true,
      },
    });
  }

  public async addTag(tag: CreateTagDto): Promise<Tag> {
    const newTag = {
      ...tag,
      createDate: Date.now().toString(),
    };
    return await this.tagsRepository.save(newTag);
  }

  public async addTags(tags: string): Promise<Tag[]> {
    const tagsArr = tags.split(',');
    const tagsWithDate = tagsArr.map((tag) => {
      return { name: tag, createDate: Date.now().toString() };
    });
    const tagsEntities = this.tagsRepository.create(tagsWithDate);
    await this.tagsRepository.insert(tagsEntities);
    return tagsEntities;
  }
}
