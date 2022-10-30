import { IsString } from 'class-validator';

export class UpdateCollectionTopicDto {
  @IsString()
  id: string;
  @IsString()
  topicName: string;
  @IsString()
  ownerName: string;
  @IsString()
  username: string;
}
