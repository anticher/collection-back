import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create.dto';
import { LikesService } from './services/likes.service';

@Controller('v1/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('add-like')
  @HttpCode(201)
  public async addLike(@Body() createLikeDto: CreateLikeDto) {
    return await this.likesService.addLike(createLikeDto);
  }

  @Delete('remove-like/:id')
  @HttpCode(204)
  public async removeLike(@Param() id: string) {
    return await this.likesService.removeLike(id);
  }
}
