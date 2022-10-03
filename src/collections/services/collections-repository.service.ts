import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/themes/theme.entity';
import { Repository } from 'typeorm';
import { Collection } from '../collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';

@Injectable()
export class CollectionsRepositoryService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    @InjectRepository(Theme)
    private ThemesRepository: Repository<Theme>,
  ) {}

  public async getAll(): Promise<Collection[]> {
    return await this.collectionsRepository.find({
      relations: {
        items: true,
        theme: true,
      },
    });
  }

  public async getLargest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async getLatest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  // public async addCollection(
  //   collection: CreateCollectionDto,
  // ): Promise<Collection> {
  //   const newCollection = {
  //     ...collection,
  //     createDate: Date.now().toString(),
  //   };
  //   return await this.collectionsRepository.save(newCollection);
  // }

  public async addCollection(
    collection: CreateCollectionDto,
  ): Promise<Collection> {
    const theme = await this.ThemesRepository.findOneBy({
      name: collection.theme,
    });
    console.log(theme);
    const newCollection = this.collectionsRepository.create({
      ...collection,
      theme,
      createDate: Date.now().toString(),
    });
    return await this.collectionsRepository.save(newCollection);
  }
}
