import { IsString } from 'class-validator';

export class UpdateCollectionThemeDto {
  @IsString()
  id: string;
  @IsString()
  themeName: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
