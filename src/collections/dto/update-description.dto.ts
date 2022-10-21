import { IsString } from 'class-validator';

export class UpdateCollectionDescriptionDto {
  @IsString()
  id: string;
  @IsString()
  description: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
