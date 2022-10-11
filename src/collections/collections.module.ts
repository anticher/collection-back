import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './services/collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from './entities/collection.entity';
import { CollectionsRepositoryService } from './services/collections-repository.service';
import { Theme } from 'src/themes/theme.entity';
import { CustomFieldTitle } from './entities/custom-field-title.entity';
import { CustomFieldValue } from './entities/custom-field-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collection,
      Theme,
      CustomFieldTitle,
      CustomFieldValue,
    ]),
  ],
  providers: [CollectionsService, CollectionsRepositoryService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
