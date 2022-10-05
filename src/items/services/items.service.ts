import { Injectable } from '@nestjs/common';
import { Item } from '../item.entity';
import { CreateItemDto } from '../dto/create.dto';
import { ItemsRepositoryService } from './items-repository.service';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepositoryService: ItemsRepositoryService,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this.itemsRepositoryService.getAll();
  }

  public async addCollectionItem(collectionItem: CreateItemDto): Promise<Item> {
    return await this.itemsRepositoryService.addCollectionItem(collectionItem);
  }
}
