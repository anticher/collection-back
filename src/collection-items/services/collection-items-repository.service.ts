import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionItem } from '../collection-item.entity';
import { CreateCollectionItemDto } from '../dto/create.dto';

@Injectable()
export class CollectionItemsRepositoryService {
  constructor(
    @InjectRepository(CollectionItem)
    private collectionItemsRepository: Repository<CollectionItem>,
  ) {}

  public async getAll(): Promise<CollectionItem[]> {
    return await this.collectionItemsRepository.find({
      relations: {
        comments: true,
      },
    });
  }

  public async addCollectionItem(
    collectionItem: CreateCollectionItemDto,
  ): Promise<CollectionItem> {
    const newCollectionItem = {
      ...collectionItem,
      createDate: Date.now().toString(),
    };
    return await this.collectionItemsRepository.save(newCollectionItem);
  }
}
