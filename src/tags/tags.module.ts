import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepositoryService } from './services/tags-repository.service';
import { TagsService } from './services/tags.service';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService, TagsRepositoryService],
})
export class TagsModule {}
