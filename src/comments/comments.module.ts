import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsRepositoryService } from './services/comments-repository.service';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CaslModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepositoryService],
})
export class CommentsModule {}
