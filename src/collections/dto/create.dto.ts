import { IsArray, IsOptional, IsString } from 'class-validator';
import { customFieldTypeEnum } from '../enum/custom-field-type.enum';

export class CreateCollectionDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  topic: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
  @IsArray()
  customFields: { fieldType: customFieldTypeEnum; title: string }[];
}
