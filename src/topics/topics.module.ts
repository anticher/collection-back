import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './services/topics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { TopicsRepositoryService } from './services/topics-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService, TopicsRepositoryService],
})
export class TopicsModule {}
