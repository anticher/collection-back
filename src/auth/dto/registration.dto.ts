import { IsString } from 'class-validator';

export class RegistrationDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
