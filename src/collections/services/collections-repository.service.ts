import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../collection.entity';

@Injectable()
export class CollectionsRepositoryService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
  ) {}

  public async getAll(): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async getLargest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async getLatest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async addCollection(collection: Collection): Promise<Collection> {
    const newCollection = {
      ...collection,
      createDate: Date.now().toString(),
    };
    return await this.collectionsRepository.save(newCollection);
  }
}
