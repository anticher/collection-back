import { IsObject, IsString } from 'class-validator';

export type CustomFieldValue = number | string | boolean | Date;

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
  @IsObject()
  customFields: Record<string, CustomFieldValue>;
}
