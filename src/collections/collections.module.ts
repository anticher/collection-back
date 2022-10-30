import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from './entities/collection.entity';
import { CollectionsRepositoryService } from './services/collections-repository.service';
import { Topic } from 'src/topics/topic.entity';
import { CustomFieldTitle } from './entities/custom-field-title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Topic, CustomFieldTitle])],
  providers: [CollectionsService, CollectionsRepositoryService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
