import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from './collection.entity';
import { CollectionsRepositoryService } from './services/collections-repository.service';
import { Theme } from 'src/themes/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Theme])],
  providers: [CollectionsService, CollectionsRepositoryService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
