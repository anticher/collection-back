import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomFieldTitle } from 'src/collections/entities/custom-field-title.entity';
import { Tag } from 'src/tags/tag.entity';
import { Raw, Repository } from 'typeorm';
import { CreateItemDto } from '../dto/create.dto';
import { CustomFieldValue } from '../entities/custom-field-value.entity';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsRepositoryService {
  constructor(
    @InjectRepository(Item)
    private collectionItemsRepository: Repository<Item>,
    @InjectRepository(Tag)
    private TagsRepository: Repository<Tag>,
    @InjectRepository(CustomFieldValue)
    private CustomFieldValuesRepository: Repository<CustomFieldValue>,
    @InjectRepository(CustomFieldTitle)
    private CustomFieldTitlesRepository: Repository<CustomFieldTitle>,
  ) {}

  public async getAll(): Promise<Item[]> {
    return await this.collectionItemsRepository.find({
      relations: {
        comments: true,
        tagNames: true,
      },
    });
  }

  public async addCollectionItem(collectionItem: CreateItemDto): Promise<Item> {
    const tagNamesArray = collectionItem.tagNames.split(',');
    const tags = await this.TagsRepository.findBy({
      name: Raw((alias) => `${alias} IN (:...names)`, {
        names: tagNamesArray,
      }),
    });
    const createDate = Date.now().toString();
    const newCollectionItem: Item = this.collectionItemsRepository.create({
      name: collectionItem.name,
      collectionId: collectionItem.collectionId,
      ownerName: collectionItem.ownerName,
      tagNames: tags,
      createDate,
    });
    const item = await this.collectionItemsRepository.save(newCollectionItem);
    const { customFields } = collectionItem;
    const customFieldsValuesPromise = Object.entries(customFields).map(
      async ([key, value]) => {
        const customFieldTitle =
          await this.CustomFieldTitlesRepository.findOneBy({ id: key });
        await this.CustomFieldValuesRepository.save({
          fieldValue: value.toString(),
          item,
          customFieldTitle,
          creatorName: item.creatorName,
          createDate,
        });
      },
    );
    await Promise.all(customFieldsValuesPromise);
    return await this.collectionItemsRepository.findOneBy({ id: item.id });
  }
}
