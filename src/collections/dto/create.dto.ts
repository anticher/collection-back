import { IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  theme: string;
  @IsString()
  ownerId: string;
}
