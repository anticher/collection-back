import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create.dto';
import { ItemsService } from './services/items.service';

@Controller('v1/collection-items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Item[]> {
    return this.itemsService.getAll();
  }

  @Post('add-collection-item')
  @HttpCode(201)
  public async addCollectionItem(
    @Body() collectionItem: CreateItemDto,
  ): Promise<Item> {
    return await this.itemsService.addCollectionItem(collectionItem);
  }
}
