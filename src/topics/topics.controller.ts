import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
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
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  public async addTopic(@Body() topic: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.addTopic(topic);
  }

  @Post('add-topics')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  public async addTopics(@Body() topics: { names: string }): Promise<Topic[]> {
    return await this.topicsService.addTopics(topics.names);
  }
}
