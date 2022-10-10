import { IsArray, IsString } from 'class-validator';
import { customFieldTypeEnum } from '../enum/custom-field-type.enum';

export class CreateCollectionDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  theme: string;
  @IsString()
  ownerName: string;
  @IsString()
  creatorName: string;
  @IsArray()
  custom: { fieldType: customFieldTypeEnum; title: string }[];
}
