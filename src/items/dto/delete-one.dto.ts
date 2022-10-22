import { IsString } from 'class-validator';

export class DeleteCollectionItemDto {
  @IsString()
  id: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
