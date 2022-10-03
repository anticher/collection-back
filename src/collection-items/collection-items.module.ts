import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { CollectionItem } from './collection-item.entity';
import { CollectionItemsController } from './collection-items.controller';
import { CollectionItemsRepositoryService } from './services/collection-items-repository.service';
import { CollectionItemsService } from './services/collection-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionItem, Tag])],
  controllers: [CollectionItemsController],
  providers: [CollectionItemsService, CollectionItemsRepositoryService],
})
export class CollectionItemsModule {}
