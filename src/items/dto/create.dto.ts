import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  tagNames: string;
  @IsString()
  collectionId: string;
  @IsString()
  ownerId: string;
  @IsString()
  creatorId: string;
}
