import { IsString } from 'class-validator';

export class DeleteCollectionCustomFieldDto {
  @IsString()
  id: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
