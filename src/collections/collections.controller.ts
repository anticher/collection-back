import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionInterceptor } from 'src/auth/permission.interceptor';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create.dto';
import { CollectionsService } from './services/collections.service';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';
import { UpdateCollectionDescriptionDto } from './dto/update-description.dto';
import { UpdateCollectionNameDto } from './dto/update-name.dto';
import { UpdateCollectionCustomFieldTitleDto } from './dto/update-custom-field-title.dto';
import { DeleteCollectionCustomFieldDto } from './dto/delete-custom-field.dto';
import { UpdateCollectionTopicDto } from './dto/update-topic.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { UpdateCollectionImageDto } from './dto/update-image.dto';

@Controller('v1/collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Collection[]> {
    return this.collectionsService.getAll();
  }

  @Get('/:owner')
  @HttpCode(200)
  public getByOwner(@Param('owner') ownerName: string): Promise<Collection[]> {
    return this.collectionsService.getByOwner(ownerName);
  }

  @Get('one-by-id/:id')
  @HttpCode(200)
  public getOneById(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.getOneById(id);
  }

  @Get('largest/:count')
  @HttpCode(200)
  public getLargest(@Param('count') count: string) {
    return this.collectionsService.getLargest(+count);
  }

  @Get('search/:searchQuery')
  @HttpCode(200)
  public async searchItems(
    @Param('searchQuery') searchQuery: string,
  ): Promise<Collection[]> {
    return await this.collectionsService.searchCollections(searchQuery);
  }

  @Post('add-collection')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async addCollection(
    @Body() collection: CreateCollectionDto,
  ): Promise<Collection> {
    return await this.collectionsService.addCollection(collection);
  }

  @Patch('update-collection-description')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async updateCollectionDescription(
    @Body() updateCollectionDescriptionDto: UpdateCollectionDescriptionDto,
  ): Promise<number> {
    return await this.collectionsService.updateCollectionDescription(
      updateCollectionDescriptionDto,
    );
  }

  @Patch('update-collection-name')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async updateCollectionName(
    @Body() updateCollectionNameDto: UpdateCollectionNameDto,
  ): Promise<number> {
    return await this.collectionsService.updateCollectionName(
      updateCollectionNameDto,
    );
  }

  @Patch('update-collection-topic')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async updateCollectionTopic(
    @Body() updateCollectionTopicDto: UpdateCollectionTopicDto,
  ): Promise<number> {
    return await this.collectionsService.updateCollectionTopic(
      updateCollectionTopicDto,
    );
  }

  @Patch('update-collection-image')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async updateCollectionImage(
    @Body() updateCollectionImageDto: UpdateCollectionImageDto,
  ): Promise<number> {
    return await this.collectionsService.updateCollectionImage(
      updateCollectionImageDto,
    );
  }

  @Patch('update-collection-custom-field-title')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async updateCollectionCustomFieldTitle(
    @Body()
    updateCollectionCustomFieldTitleDto: UpdateCollectionCustomFieldTitleDto,
  ): Promise<number> {
    return await this.collectionsService.updateCollectionCustomFieldTitle(
      updateCollectionCustomFieldTitleDto,
    );
  }

  @Delete('delete-collection-custom-field')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(204)
  public async deleteCollectionCustomField(
    @Body()
    deleteCollectionCustomFieldDto: DeleteCollectionCustomFieldDto,
  ): Promise<void> {
    return await this.collectionsService.deleteCollectionCustomField(
      deleteCollectionCustomFieldDto,
    );
  }

  @Delete('delete-collection')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(204)
  public async deleteCollection(
    @Body()
    deleteCollectionDto: DeleteCollectionDto,
  ): Promise<void> {
    return await this.collectionsService.deleteCollection(deleteCollectionDto);
  }
}
