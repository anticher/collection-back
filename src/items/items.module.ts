import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { ItemsRepositoryService } from './services/items-repository.service';
import { ItemsService } from './services/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Tag])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepositoryService],
})
export class ItemsModule {}
