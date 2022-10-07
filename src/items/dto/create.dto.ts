import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  tagNames: string;
  @IsString()
  collectionId: string;
  @IsString()
  ownerName: string;
  @IsString()
  creatorName: string;
}
