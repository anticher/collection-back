import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from '../entities/collection.entity';
import { CreateCollectionDto } from '../dto/create.dto';
import { CollectionsRepositoryService } from './collections-repository.service';
import { UpdateCollectionDescriptionDto } from '../dto/update-description.dto';
import { UpdateCollectionNameDto } from '../dto/update-name.dto';
import { UpdateCollectionCustomFieldTitleDto } from '../dto/update-custom-field-title.dto';
import { DeleteCollectionCustomFieldDto } from '../dto/delete-custom-field.dto';
import { UpdateCollectionTopicDto } from '../dto/update-topic.dto';
import { DeleteCollectionDto } from '../dto/delete-collection.dto';
import { UpdateCollectionImageDto } from '../dto/update-image.dto';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepositoryService: CollectionsRepositoryService,
  ) {}

  public async getAll(): Promise<Collection[]> {
    return await this.collectionsRepositoryService.getAll();
  }

  public async getByOwner(ownerName: string): Promise<Collection[]> {
    const result = await this.collectionsRepositoryService.getByOwner(
      ownerName,
    );
    console.log(result);
    return result;
  }

  public async getOneById(id: string): Promise<Collection> {
    return await this.collectionsRepositoryService.getOneById(id);
  }

  public async getLargest(count: number) {
    return await this.collectionsRepositoryService.getLargest(count);
  }

  public async searchCollections(searchQuery: string) {
    return await this.collectionsRepositoryService.searchCollections(
      searchQuery,
    );
  }

  public async addCollection(
    collection: CreateCollectionDto,
  ): Promise<Collection> {
    return await this.collectionsRepositoryService.addCollection(collection);
  }

  public async updateCollectionDescription(
    updateCollectionDescriptionDto: UpdateCollectionDescriptionDto,
  ): Promise<number> {
    return await this.collectionsRepositoryService.updateCollectionDescription(
      updateCollectionDescriptionDto,
    );
  }

  public async updateCollectionName(
    updateCollectionNameDto: UpdateCollectionNameDto,
  ): Promise<number> {
    return await this.collectionsRepositoryService.updateCollectionName(
      updateCollectionNameDto,
    );
  }

  public async updateCollectionTopic(
    updateCollectionTopicDto: UpdateCollectionTopicDto,
  ): Promise<number> {
    return await this.collectionsRepositoryService.updateCollectionTopic(
      updateCollectionTopicDto,
    );
  }

  public async updateCollectionImage(
    updateCollectionImageDto: UpdateCollectionImageDto,
  ): Promise<number> {
    return await this.collectionsRepositoryService.updateCollectionImage(
      updateCollectionImageDto,
    );
  }

  public async updateCollectionCustomFieldTitle(
    updateCollectionCustomFieldTitleDto: UpdateCollectionCustomFieldTitleDto,
  ): Promise<number> {
    return await this.collectionsRepositoryService.updateCollectionCustomFieldTitle(
      updateCollectionCustomFieldTitleDto,
    );
  }

  public async deleteCollectionCustomField(
    deleteCollectionCustomFieldDto: DeleteCollectionCustomFieldDto,
  ): Promise<void> {
    const result =
      await this.collectionsRepositoryService.deleteCollectionCustomField(
        deleteCollectionCustomFieldDto,
      );
    if (!result) {
      throw new NotFoundException('field does not exist');
    }
    return;
  }

  public async deleteCollection(
    deleteCollectionDto: DeleteCollectionDto,
  ): Promise<void> {
    const result = await this.collectionsRepositoryService.deleteCollection(
      deleteCollectionDto,
    );
    if (!result) {
      throw new NotFoundException('collection does not exist');
    }
    return;
  }
}
