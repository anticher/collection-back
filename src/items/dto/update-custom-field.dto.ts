import { IsString } from 'class-validator';

export class UpdateCollectionItemCustomFieldDto {
  @IsString()
  id: string;
  @IsString()
  customFieldValue: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
