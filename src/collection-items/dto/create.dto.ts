import { IsString } from 'class-validator';

export class CreateCollectionItemDto {
  @IsString()
  name: string;
  @IsString()
  collectionId: string;
  @IsString()
  ownerId: string;
  @IsString()
  tags: string;
}
