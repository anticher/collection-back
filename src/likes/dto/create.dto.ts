import { IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}
