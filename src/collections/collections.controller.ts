import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create.dto';
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  public async addCollection(
    @Body() collection: CreateCollectionDto,
  ): Promise<Collection> {
    return await this.collectionsService.addCollection(collection);
  }

  @Delete('delete-collection/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  public async deleteCollection(@Param('id') id: string): Promise<void> {
    return await this.collectionsService.deleteCollection(id);
  }
}
