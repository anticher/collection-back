import { IsArray, IsString } from 'class-validator';

export class UpdateCollectionItemTagsDto {
  @IsString()
  id: string;
  @IsArray()
  tags: string[];
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
