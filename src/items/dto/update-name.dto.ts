import { IsString } from 'class-validator';

export class UpdateCollectionItemNameDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
