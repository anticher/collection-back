import { IsString } from 'class-validator';

export class UpdateCollectionNameDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
