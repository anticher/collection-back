import { IsObject, IsOptional, IsString } from 'class-validator';

export type CustomFieldValue = number | string | boolean | Date;

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  tagNames: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsString()
  collectionId: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
  @IsObject()
  @IsOptional()
  customFields: Record<string, CustomFieldValue>;
}
