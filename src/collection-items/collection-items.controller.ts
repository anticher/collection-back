import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CollectionItem } from './collection-item.entity';
import { CreateCollectionItemDto } from './dto/create.dto';
import { CollectionItemsService } from './services/collection-items.service';

@Controller('v1/collection-items')
export class CollectionItemsController {
  constructor(
    private readonly collectionItemsService: CollectionItemsService,
  ) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<CollectionItem[]> {
    return this.collectionItemsService.getAll();
  }

  @Post('add-collection-item')
  @HttpCode(201)
  public async addCollection(
    @Body() collectionItem: CreateCollectionItemDto,
  ): Promise<CollectionItem> {
    return await this.collectionItemsService.addCollection(collectionItem);
  }
}
