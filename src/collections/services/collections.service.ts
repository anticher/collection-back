import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from '../collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';
import { CollectionsRepositoryService } from './collections-repository.service';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepositoryService: CollectionsRepositoryService,
  ) {}

  public async getAll(): Promise<Collection[]> {
    return await this.collectionsRepositoryService.getAll();
  }

  public async getLargest(count: string): Promise<Collection[]> {
    return await this.collectionsRepositoryService.getLargest(count);
  }

  public async getLatest(count: string): Promise<Collection[]> {
    return await this.collectionsRepositoryService.getLatest(count);
  }

  public async addCollection(
    collection: CreateCollectionDto,
  ): Promise<Collection> {
    return await this.collectionsRepositoryService.addCollection(collection);
  }

  public async deleteCollection(id: string): Promise<void> {
    const result = await this.collectionsRepositoryService.deleteCollection(id);
    if (!result) {
      throw new NotFoundException('collection does not exist');
    }
    return;
  }
}
