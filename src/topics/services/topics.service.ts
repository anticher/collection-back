import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from '../dto/create.dto';
import { Topic } from '../topic.entity';
import { TopicsRepositoryService } from './topics-repository.service';

@Injectable()
export class TopicsService {
  constructor(
    private readonly topicsRepositoryService: TopicsRepositoryService,
  ) {}

  public async getAll(): Promise<Topic[]> {
    return await this.topicsRepositoryService.getAll();
  }

  public async addTopic(topic: CreateTopicDto): Promise<Topic> {
    return await this.topicsRepositoryService.addTopic(topic);
  }

  public async addTopics(topics: string): Promise<Topic[]> {
    return await this.topicsRepositoryService.addTopics(topics);
  }
}
