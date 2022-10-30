import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from '../dto/create.dto';
import { Topic } from '../topic.entity';

@Injectable()
export class TopicsRepositoryService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  public async getAll(): Promise<Topic[]> {
    return await this.topicsRepository.find({
      relations: {
        collections: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  public async addTopic(topic: CreateTopicDto): Promise<Topic> {
    const newTopic = {
      ...topic,
      createDate: Date.now().toString(),
    };
    return await this.topicsRepository.save(newTopic);
  }

  public async addTopics(topics: string): Promise<Topic[]> {
    const topicsArr = topics.split(',');
    const topicsWithDate = topicsArr.map((topic) => {
      return { name: topic, createDate: Date.now().toString() };
    });
    const topicsEntities = this.topicsRepository.create(topicsWithDate);
    await this.topicsRepository.insert(topicsEntities);
    return topicsEntities;
  }
}
