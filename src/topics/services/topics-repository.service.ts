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
    });
  }

  public async addTopic(topic: CreateTopicDto): Promise<Topic> {
    const newTopic = {
      ...topic,
      createDate: Date.now().toString(),
    };
    return await this.topicsRepository.save(newTopic);
  }
}
