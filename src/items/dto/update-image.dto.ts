import { IsString } from 'class-validator';

export class UpdateCollectionItemImageDto {
  @IsString()
  id: string;
  @IsString()
  image: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
