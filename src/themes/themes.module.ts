import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './services/theme.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './theme.entity';
import { ThemesRepositoryService } from './services/theme-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemesController],
  providers: [ThemesService, ThemesRepositoryService],
})
export class ThemesModule {}
