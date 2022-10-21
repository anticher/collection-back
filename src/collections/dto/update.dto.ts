import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { customFieldTypeEnum } from '../enum/custom-field-type.enum';

export class UpdateCollectionDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  theme: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
  @IsObject()
  customFields: {
    [key: string]: {
      id: string;
      fieldType: customFieldTypeEnum;
      title: string;
    };
  };
}
