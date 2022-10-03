import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { DataSource, Raw, Repository } from 'typeorm';
import { CollectionItem } from '../collection-item.entity';
import { CreateCollectionItemDto } from '../dto/create.dto';

@Injectable()
export class CollectionItemsRepositoryService {
  constructor(
    @InjectRepository(CollectionItem)
    private collectionItemsRepository: Repository<CollectionItem>,
    @InjectRepository(Tag)
    private TagsRepository: Repository<Tag>,
    private dataSource: DataSource,
  ) {}

  public async getAll(): Promise<CollectionItem[]> {
    return await this.collectionItemsRepository.find({
      relations: {
        comments: true,
        tags: true,
      },
    });
  }

  public async addCollectionItem(
    collectionItem: CreateCollectionItemDto,
  ): Promise<CollectionItem> {
    const tagNamesArray = collectionItem.tagNames.split(',');
    const tags = await this.TagsRepository.findBy({
      name: Raw((alias) => `${alias} IN (:...names)`, {
        names: tagNamesArray,
      }),
    });
    const newCollectionItem = this.collectionItemsRepository.create({
      name: collectionItem.name,
      collectionId: collectionItem.collectionId,
      ownerId: collectionItem.ownerId,
      tags,
      createDate: Date.now().toString(),
    });
    return await this.collectionItemsRepository.save(newCollectionItem);
  }
}
