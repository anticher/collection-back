import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from '../dto/create.dto';
import { Theme } from '../theme.entity';
import { ThemesRepositoryService } from './theme-repository.service';

@Injectable()
export class ThemesService {
  constructor(
    private readonly themesRepositoryService: ThemesRepositoryService,
  ) {}

  public async getAll(): Promise<Theme[]> {
    return await this.themesRepositoryService.getAll();
  }

  public async addTheme(theme: CreateThemeDto): Promise<Theme> {
    return await this.themesRepositoryService.addTheme(theme);
  }
}
