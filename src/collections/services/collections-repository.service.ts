import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/topics/topic.entity';
import { Repository } from 'typeorm';
import { Collection } from '../entities/collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';
import { CustomFieldTitle } from '../entities/custom-field-title.entity';
import { UpdateCollectionDescriptionDto } from '../dto/update-description.dto';
import { UpdateCollectionNameDto } from '../dto/update-name.dto';
import { UpdateCollectionCustomFieldTitleDto } from '../dto/update-custom-field-title.dto';
import { DeleteCollectionCustomFieldDto } from '../dto/delete-custom-field.dto';
import { UpdateCollectionTopicDto } from '../dto/update-topic.dto';
import { DeleteCollectionDto } from '../dto/delete-collection.dto';
import { UpdateCollectionImageDto } from '../dto/update-image.dto';

@Injectable()
export class CollectionsRepositoryService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    @InjectRepository(Topic)
    private TopicsRepository: Repository<Topic>,
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
        topic: true,
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
        topic: true,
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
        topic: true,
        customFieldTitles: true,
      },
    });
  }

  public async getLargest(count: number) {
    return await this.collectionsRepository
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.items', 'item')
      .groupBy('collection.id')
      .select('count(item.id)')
      .orderBy('count(item.id)', 'DESC')
      .limit(count)
      .select('collection.*, count(item.id) AS itemsCount')
      .execute();
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
    const topic = await this.TopicsRepository.findOneBy({
      name: collection.topic,
    });
    const newCollection = {
      ...collection,
      topic,
      creatorName: collection.username,
      createDate: Date.now().toString(),
    };
    const createdCollection = await this.collectionsRepository.save(
      newCollection,
    );
    const customFieldsPromise = collection.customFields.map(
      (customField, index) => {
        return this.CustomFieldTitlesRepository.save({
          fieldType: customField.fieldType,
          fieldName: customField.title,
          fieldIndex: index,
          collectionId: createdCollection.id,
        });
      },
    );
    await Promise.all(customFieldsPromise);
    return await this.collectionsRepository.findOneBy({
      id: createdCollection.id,
    });
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

  public async updateCollectionTopic(
    updateCollectionTopicDto: UpdateCollectionTopicDto,
  ): Promise<number> {
    const { id, topicName } = updateCollectionTopicDto;
    const topic = await this.TopicsRepository.findOneBy({
      name: topicName,
    });
    const result = await this.collectionsRepository
      .createQueryBuilder()
      .update(Collection)
      .set({ topic })
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
