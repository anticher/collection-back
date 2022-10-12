import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { ItemsController } from './items.controller';
import { Item } from './entities/item.entity';
import { ItemsRepositoryService } from './services/items-repository.service';
import { ItemsService } from './services/items.service';
import { CustomFieldValue } from './entities/custom-field-value.entity';
import { CustomFieldTitle } from 'src/collections/entities/custom-field-title.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Tag, CustomFieldValue, CustomFieldTitle]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepositoryService],
})
export class ItemsModule {}
