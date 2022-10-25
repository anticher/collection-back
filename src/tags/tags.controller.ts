import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create.dto';
import { TagsService } from './services/tags.service';
import { Tag } from './tag.entity';

@Controller('v1/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }

  @Get('one-by-name/:name')
  @HttpCode(200)
  public async getOneByName(@Param('name') name: string): Promise<Tag> {
    return await this.tagsService.getOneByName(name);
  }

  @Post('add-tag')
  @HttpCode(201)
  public async addTag(@Body() tag: CreateTagDto): Promise<Tag> {
    return await this.tagsService.addTag(tag);
  }
}
