import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string } | string> {
    return await this.authService.login(loginDto);
  }

  @Post('registration')
  public async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<User> {
    return await this.authService.registration(registrationDto);
  }
}
