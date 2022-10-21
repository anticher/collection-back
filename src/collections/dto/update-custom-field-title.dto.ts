import { IsString } from 'class-validator';

export class UpdateCollectionCustomFieldTitleDto {
  @IsString()
  id: string;
  @IsString()
  customFieldTitle: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
