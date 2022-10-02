import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionItem } from './collection-item.entity';
import { CollectionItemsController } from './collection-items.controller';
import { CollectionItemsRepositoryService } from './services/collection-items-repository.service';
import { CollectionItemsService } from './services/collection-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionItem])],
  controllers: [CollectionItemsController],
  providers: [CollectionItemsService, CollectionItemsRepositoryService],
})
export class CollectionItemsModule {}
