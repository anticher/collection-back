import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateThemeDto } from './dto/create.dto';
import { ThemesService } from './services/theme.service';
import { Theme } from './theme.entity';

@Controller('v1/themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  @HttpCode(200)
  public getAll(): Promise<Theme[]> {
    return this.themesService.getAll();
  }

  @Post('add-theme')
  @HttpCode(201)
  public async addTheme(@Body() theme: CreateThemeDto): Promise<Theme> {
    return await this.themesService.addTheme(theme);
  }
}
