import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { Raw, Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create.dto';
import { Item } from '../item.entity';

@Injectable()
export class ItemsRepositoryService {
  constructor(
    @InjectRepository(Item)
    private collectionItemsRepository: Repository<Item>,
    @InjectRepository(Tag)
    private TagsRepository: Repository<Tag>,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this.collectionItemsRepository.find({
      relations: {
        comments: true,
        tags: true,
      },
    });
  }

  public async addCollectionItem(collectionItem: CreateItemDto): Promise<Item> {
    const tagNamesArray = collectionItem.tagNames.split(',');
    const tags = await this.TagsRepository.findBy({
      name: Raw((alias) => `${alias} IN (:...names)`, {
        names: tagNamesArray,
      }),
    });
    const newCollectionItem = this.collectionItemsRepository.create({
      name: collectionItem.name,
      collectionId: collectionItem.collectionId,
      ownerName: collectionItem.ownerName,
      tags,
      createDate: Date.now().toString(),
    });
    return await this.collectionItemsRepository.save(newCollectionItem);
  }
}
