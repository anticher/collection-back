import { IsString } from 'class-validator';

export class DeleteCollectionDto {
  @IsString()
  id: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
