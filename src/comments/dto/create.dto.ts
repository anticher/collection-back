import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  message: string;

  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}
