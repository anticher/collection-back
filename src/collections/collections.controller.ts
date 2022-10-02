import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Collection } from './collection.entity';
import { CollectionsService } from './services/collections.service';

@Controller('v1/collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Collection[]> {
    return this.collectionsService.getAll();
  }

  @Get('largest')
  @HttpCode(200)
  public getLargest(@Query('count') count?: string): Promise<Collection[]> {
    return this.collectionsService.getLargest(count);
  }

  @Get('latest')
  @HttpCode(200)
  public getLatest(@Query('count') count?: string): Promise<Collection[]> {
    return this.collectionsService.getLatest(count);
  }

  @Post('add-collection')
  @HttpCode(201)
  public async addCollection(
    @Body() collection: Collection,
  ): Promise<Collection> {
    return await this.collectionsService.addCollection(collection);
  }
}
