import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThemeDto } from '../dto/create.dto';
import { Theme } from '../theme.entity';

@Injectable()
export class ThemesRepositoryService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
  ) {}

  public async getAll(): Promise<Theme[]> {
    return await this.themesRepository.find({
      relations: {
        collections: true,
      },
    });
  }

  public async addTheme(theme: CreateThemeDto): Promise<Theme> {
    const newTheme = {
      ...theme,
      createDate: Date.now().toString(),
    };
    return await this.themesRepository.save(newTheme);
  }
}
