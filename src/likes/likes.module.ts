import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikesController } from './likes.controller';
import { LikesRepositoryService } from './services/likes-repository.service';
import { LikesService } from './services/likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService, LikesRepositoryService],
})
export class LikesModule {}
