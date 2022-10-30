import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateTopicDto } from './dto/create.dto';
import { TopicsService } from './services/topics.service';
import { Topic } from './topic.entity';

@Controller('v1/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Topic[]> {
    return this.topicsService.getAll();
  }

  @Post('add-topic')
  @HttpCode(201)
  public async addTopic(@Body() topic: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.addTopic(topic);
  }
}
