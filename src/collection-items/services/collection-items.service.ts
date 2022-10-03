import { Injectable } from '@nestjs/common';
import { CollectionItem } from '../collection-item.entity';
import { CreateCollectionItemDto } from '../dto/create.dto';
import { CollectionItemsRepositoryService } from './collection-items-repository.service';

@Injectable()
export class CollectionItemsService {
  constructor(
    private readonly collectionItemsRepositoryService: CollectionItemsRepositoryService,
  ) {}

  public async getAll(): Promise<CollectionItem[]> {
    return await this.collectionItemsRepositoryService.getAll();
  }

  public async addCollectionItem(
    collectionItem: CreateCollectionItemDto,
  ): Promise<CollectionItem> {
    return await this.collectionItemsRepositoryService.addCollectionItem(
      collectionItem,
    );
  }
}
