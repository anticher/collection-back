import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/themes/theme.entity';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';
import { CustomFieldTitle } from '../entities/custom-field-title.entity';

@Injectable()
export class CollectionsRepositoryService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    @InjectRepository(Theme)
    private ThemesRepository: Repository<Theme>,
    @InjectRepository(CustomFieldTitle)
    private CustomFieldTitlesRepository: Repository<CustomFieldTitle>,
  ) {}

  public async getAll(): Promise<Collection[]> {
    return await this.collectionsRepository.find({
      relations: {
        items: {
          tagNames: true,
        },
        theme: true,
        customFieldTitles: true,
      },
    });
  }

  public async getByOwner(ownerName: string): Promise<Collection[]> {
    return await this.collectionsRepository.find({
      where: {
        ownerName,
      },
      relations: {
        items: {
          tagNames: true,
        },
        theme: true,
        customFieldTitles: true,
      },
    });
  }

  public async getOneById(id: string): Promise<Collection> {
    return await this.collectionsRepository.findOne({
      where: {
        id,
      },
      relations: {
        items: {
          tagNames: true,
        },
        theme: true,
        customFieldTitles: true,
      },
    });
  }

  public async getLargest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async getLatest(count: string): Promise<Collection[]> {
    return await this.collectionsRepository.find();
  }

  public async addCollection(
    collection: CreateCollectionDto,
  ): Promise<Collection> {
    const theme = await this.ThemesRepository.findOneBy({
      name: collection.theme,
    });
    const newCollection = {
      ...collection,
      theme,
      createDate: Date.now().toString(),
    };
    const createdCollection = await this.collectionsRepository.save(
      newCollection,
    );
    const customFieldsPromise = collection.customFields.map((customField) => {
      return this.CustomFieldTitlesRepository.save({
        fieldType: customField.fieldType,
        fieldName: customField.title,
        collectionId: createdCollection.id,
        createDate: Date.now().toString(),
      });
    });
    const customFields = await Promise.all(customFieldsPromise);
    return await this.collectionsRepository.save(newCollection);
  }

  public async deleteCollection(id: string): Promise<number> {
    return (await this.collectionsRepository.delete(id)).affected;
  }
}
