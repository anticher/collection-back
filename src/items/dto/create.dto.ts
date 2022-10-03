import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  collectionId: string;
  @IsString()
  ownerId: string;
  @IsString()
  tagNames: string;
}
