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
} from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create.dto';
import { ItemsService } from './services/items.service';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';
import { UpdateCollectionItemNameDto } from './dto/update-name.dto';
import { UpdateCollectionItemCustomFieldDto } from './dto/update-custom-field.dto';
import { UpdateCollectionItemImageDto } from './dto/update-image.dto';
import { UpdateCollectionItemTagsDto } from './dto/update-tags.dto';
import { DeleteCollectionItemDto } from './dto/delete-one.dto';

@Controller('v1/collection-items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(200)
  public async getAll(): Promise<Item[]> {
    return await this.itemsService.getAll();
  }

  @Get('one-by-id/:id')
  @HttpCode(200)
  public async getOneById(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.getOneById(id);
  }

  @Post('add-collection-item')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async addCollectionItem(
    @Body() collectionItem: CreateItemDto,
  ): Promise<Item> {
    return await this.itemsService.addCollectionItem(collectionItem);
  }

  @Patch('update-name')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async updateName(
    @Body() updateCollectionItemNameDto: UpdateCollectionItemNameDto,
  ): Promise<number> {
    return await this.itemsService.updateName(updateCollectionItemNameDto);
  }

  @Patch('update-image')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async updateCollectionImage(
    @Body() updateCollectionItemImageDto: UpdateCollectionItemImageDto,
  ): Promise<number> {
    return await this.itemsService.updateCollectionImage(
      updateCollectionItemImageDto,
    );
  }

  @Patch('update-tags')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async updateCollectionTags(
    @Body() updateCollectionItemTagsDto: UpdateCollectionItemTagsDto,
  ): Promise<number> {
    return await this.itemsService.updateCollectionTags(
      updateCollectionItemTagsDto,
    );
  }

  @Patch('update-custom-field')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(201)
  public async updateCustomField(
    @Body()
    updateCollectionItemCustomFieldDto: UpdateCollectionItemCustomFieldDto,
  ): Promise<number> {
    return await this.itemsService.updateCustomField(
      updateCollectionItemCustomFieldDto,
    );
  }

  @Delete('delete-one')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(204)
  public async deleteOne(
    @Body()
    deleteCollectionItemDto: DeleteCollectionItemDto,
  ): Promise<void> {
    return await this.itemsService.deleteOne(deleteCollectionItemDto);
  }
}
