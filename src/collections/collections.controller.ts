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
  UseInterceptors,
} from '@nestjs/common';
import { PermissionInterceptor } from 'src/auth/permission.interceptor';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create.dto';
import { CollectionsService } from './services/collections.service';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';

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
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(201)
  public async addCollection(
    @Body() collection: CreateCollectionDto,
  ): Promise<Collection> {
    console.log('1');
    return await this.collectionsService.addCollection(collection);
  }

  @Delete('delete-collection/:id')
  @UseGuards(CookieAuthenticationGuard)
  @UseInterceptors(PermissionInterceptor)
  @HttpCode(204)
  public async deleteCollection(@Param('id') id: string): Promise<void> {
    return await this.collectionsService.deleteCollection(id);
  }
}
