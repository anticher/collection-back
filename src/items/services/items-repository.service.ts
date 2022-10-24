import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomFieldTitle } from 'src/collections/entities/custom-field-title.entity';
import { Tag } from 'src/tags/tag.entity';
import { Raw, Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create.dto';
import { DeleteCollectionItemDto } from '../dto/delete-one.dto';
import { UpdateCollectionItemCustomFieldDto } from '../dto/update-custom-field.dto';
import { UpdateCollectionItemImageDto } from '../dto/update-image.dto';
import { UpdateCollectionItemNameDto } from '../dto/update-name.dto';
import { UpdateCollectionItemTagsDto } from '../dto/update-tags.dto';
import { CustomFieldValue } from '../entities/custom-field-value.entity';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsRepositoryService {
  constructor(
    @InjectRepository(Item)
    private collectionItemsRepository: Repository<Item>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    @InjectRepository(CustomFieldValue)
    private customFieldValuesRepository: Repository<CustomFieldValue>,
    @InjectRepository(CustomFieldTitle)
    private customFieldTitlesRepository: Repository<CustomFieldTitle>,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this.collectionItemsRepository.find({
      relations: {
        comments: true,
        tagNames: true,
      },
    });
  }

  public async getOneById(id: string): Promise<Item> {
    return await this.collectionItemsRepository.findOne({
      where: {
        id,
      },
      relations: {
        comments: true,
        tagNames: true,
        likes: true,
        customFieldValues: {
          customFieldTitle: true,
        },
      },
    });
  }

  public async addCollectionItem(collectionItem: CreateItemDto): Promise<Item> {
    const tagNamesArray = collectionItem.tagNames.split(',');
    const tags = await this.tagsRepository.findBy({
      name: Raw((alias) => `${alias} IN (:...names)`, {
        names: tagNamesArray,
      }),
    });
    const createDate = Date.now().toString();
    const newCollectionItem: Item = this.collectionItemsRepository.create({
      name: collectionItem.name,
      collectionId: collectionItem.collectionId,
      ownerName: collectionItem.ownerName,
      creatorName: collectionItem.username,
      image: collectionItem.image || null,
      tagNames: tags,
      createDate,
    });
    const item = await this.collectionItemsRepository.save(newCollectionItem);
    const { customFields } = collectionItem;
    if (customFields) {
      const customFieldsValuesPromise = Object.entries(customFields).map(
        async ([key, value]) => {
          const customFieldTitle =
            await this.customFieldTitlesRepository.findOneBy({ id: key });
          await this.customFieldValuesRepository.save({
            fieldValue: value.toString(),
            item,
            customFieldTitle,
            creatorName: item.creatorName,
            createDate,
          });
        },
      );
      await Promise.all(customFieldsValuesPromise);
    }

    return await this.collectionItemsRepository.findOneBy({ id: item.id });
  }

  public async updateName(
    updateCollectionItemNameDto: UpdateCollectionItemNameDto,
  ): Promise<number> {
    const { id, name } = updateCollectionItemNameDto;
    const result = await this.collectionItemsRepository
      .createQueryBuilder()
      .update(Item)
      .set({ name })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCollectionTags(
    updateCollectionItemTagsDto: UpdateCollectionItemTagsDto,
  ): Promise<number> {
    const tags = await this.tagsRepository.findBy({
      name: Raw((alias) => `${alias} IN (:...names)`, {
        names: updateCollectionItemTagsDto.tags,
      }),
    });
    const { id } = updateCollectionItemTagsDto;
    const item = await this.collectionItemsRepository.findOneBy({ id });
    item.tagNames = tags;
    this.collectionItemsRepository.save(item);
    return 1;
  }

  public async updateCollectionImage(
    updateCollectionItemImageDto: UpdateCollectionItemImageDto,
  ): Promise<number> {
    const { id } = updateCollectionItemImageDto;
    let { image } = updateCollectionItemImageDto;
    if (!image) image = null;
    const result = await this.collectionItemsRepository
      .createQueryBuilder()
      .update(Item)
      .set({ image })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async updateCustomField(
    updateCollectionItemCustomFieldDto: UpdateCollectionItemCustomFieldDto,
  ): Promise<number> {
    const { id, customFieldValue } = updateCollectionItemCustomFieldDto;
    const result = await this.customFieldValuesRepository
      .createQueryBuilder()
      .update(CustomFieldValue)
      .set({ fieldValue: customFieldValue })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }

  public async deleteOne(
    deleteCollectionItemDto: DeleteCollectionItemDto,
  ): Promise<number> {
    return (
      await this.collectionItemsRepository.delete(deleteCollectionItemDto.id)
    ).affected;
  }
}
