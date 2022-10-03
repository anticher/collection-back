import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { ItemsController } from './collection-items.controller';
import { Item } from './item.entity';
import { ItemsRepositoryService } from './services/collection-items-repository.service';
import { ItemsService } from './services/collection-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Tag])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepositoryService],
})
export class CollectionItemsModule {}
