import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  message: string;

  @IsString()
  author: string;

  @IsString()
  ownerId: string;

  @IsString()
  itemId: string;
}
