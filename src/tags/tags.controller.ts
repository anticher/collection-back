import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
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
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  public async addTag(@Body() tag: CreateTagDto): Promise<Tag> {
    return await this.tagsService.addTag(tag);
  }
}
