import { IsString } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  name: string;
}
