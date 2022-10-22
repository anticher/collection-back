import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from '../dto/create.dto';
import { ItemsRepositoryService } from './items-repository.service';
import { UpdateCollectionItemNameDto } from '../dto/update-name.dto';
import { UpdateCollectionItemCustomFieldDto } from '../dto/update-custom-field.dto';
import { UpdateCollectionItemImageDto } from '../dto/update-image.dto';
import { UpdateCollectionItemTagsDto } from '../dto/update-tags.dto';
import { DeleteCollectionItemDto } from '../dto/delete-one.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepositoryService: ItemsRepositoryService,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this.itemsRepositoryService.getAll();
  }

  public async getOneById(id: string): Promise<Item> {
    return await this.itemsRepositoryService.getOneById(id);
  }

  public async updateName(
    updateCollectionItemNameDto: UpdateCollectionItemNameDto,
  ): Promise<number> {
    return await this.itemsRepositoryService.updateName(
      updateCollectionItemNameDto,
    );
  }

  public async updateCollectionImage(
    updateCollectionItemImageDto: UpdateCollectionItemImageDto,
  ): Promise<number> {
    return await this.itemsRepositoryService.updateCollectionImage(
      updateCollectionItemImageDto,
    );
  }

  public async updateCollectionTags(
    updateCollectionItemTagsDto: UpdateCollectionItemTagsDto,
  ): Promise<number> {
    return await this.itemsRepositoryService.updateCollectionTags(
      updateCollectionItemTagsDto,
    );
  }

  public async updateCustomField(
    updateCollectionItemCustomFieldDto: UpdateCollectionItemCustomFieldDto,
  ): Promise<number> {
    return await this.itemsRepositoryService.updateCustomField(
      updateCollectionItemCustomFieldDto,
    );
  }

  public async addCollectionItem(collectionItem: CreateItemDto): Promise<Item> {
    return await this.itemsRepositoryService.addCollectionItem(collectionItem);
  }

  public async deleteOne(
    deleteCollectionItemDto: DeleteCollectionItemDto,
  ): Promise<void> {
    const result = await this.itemsRepositoryService.deleteOne(
      deleteCollectionItemDto,
    );
    if (!result) {
      throw new NotFoundException('collection does not exist');
    }
    return;
  }
}
