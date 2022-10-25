import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/themes/theme.entity';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';
import { CustomFieldTitle } from '../entities/custom-field-title.entity';
import { UpdateCollectionDescriptionDto } from '../dto/update-description.dto';
import { UpdateCollectionNameDto } from '../dto/update-name.dto';
import { UpdateCollectionCustomFieldTitleDto } from '../dto/update-custom-field-title.dto';
import { DeleteCollectionCustomFieldDto } from '../dto/delete-custom-field.dto';
import { UpdateCollectionThemeDto } from '../dto/update-theme.dto';
import { DeleteCollectionDto } from '../dto/delete-collection.dto';
import { UpdateCollectionImageDto } from '../dto/update-image.dto';

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
          customFieldValues: {
            customFieldTitle: true,
          },
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
          customFieldValues: {
            customFieldTitle: true,
          },
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
          customFieldValues: {
            customFieldTitle: true,
          },
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

  public async searchCollections(searchQuery: string) {
    return await this.collectionsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH(name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(description) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
      .getMany();
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
      createdBy: collection.username,
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
      });
    });
    await Promise.all(customFieldsPromise);
    return await this.collectionsRepository.findOneBy({
      id: createdCollection.id,
    });
    return await this.collectionsRepository.save(createdCollection);
  }

  public async updateCollectionDescription(
    updateCollectionDescriptionDto: UpdateCollectionDescriptionDto,
  ): Promise<number> {
    const { id, description } = updateCollectionDescriptionDto;
    const result = await this.collectionsRepository
      .createQueryBuilder()
      .update(Collection)
      .set({ description })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCollectionName(
    updateCollectionNameDto: UpdateCollectionNameDto,
  ): Promise<number> {
    const { id, name } = updateCollectionNameDto;
    const result = await this.collectionsRepository
      .createQueryBuilder()
      .update(Collection)
      .set({ name })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCollectionTheme(
    updateCollectionThemeDto: UpdateCollectionThemeDto,
  ): Promise<number> {
    const { id, themeName } = updateCollectionThemeDto;
    const theme = await this.ThemesRepository.findOneBy({
      name: themeName,
    });
    const result = await this.collectionsRepository
      .createQueryBuilder()
      .update(Collection)
      .set({ theme })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCollectionImage(
    updateCollectionImageDto: UpdateCollectionImageDto,
  ): Promise<number> {
    const { id } = updateCollectionImageDto;
    let { image } = updateCollectionImageDto;
    if (!image) image = null;
    const result = await this.collectionsRepository
      .createQueryBuilder()
      .update(Collection)
      .set({ image })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCollectionCustomFieldTitle(
    updateCollectionCustomFieldTitleDto: UpdateCollectionCustomFieldTitleDto,
  ): Promise<number> {
    const { id, customFieldTitle } = updateCollectionCustomFieldTitleDto;
    const result = await this.CustomFieldTitlesRepository.createQueryBuilder()
      .update(CustomFieldTitle)
      .set({ fieldName: customFieldTitle })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async deleteCollectionCustomField(
    deleteCollectionCustomFieldDto: DeleteCollectionCustomFieldDto,
  ): Promise<number> {
    const { id } = deleteCollectionCustomFieldDto;
    const result = await this.CustomFieldTitlesRepository.createQueryBuilder()
      .delete()
      .from(CustomFieldTitle)
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async deleteCollection(
    deleteCollectionDto: DeleteCollectionDto,
  ): Promise<number> {
    return (await this.collectionsRepository.delete(deleteCollectionDto.id))
      .affected;
  }
}
