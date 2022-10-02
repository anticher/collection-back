import { Injectable } from '@nestjs/common';
import { Collection } from '../collection.entity';
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

  public async addCollection(collection: Collection): Promise<Collection> {
    return await this.collectionsRepositoryService.addCollection(collection);
  }
}