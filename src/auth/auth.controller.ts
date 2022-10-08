import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponse } from './models/login-response.model';
import { RegistrationResponse } from './models/registration-response.model';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(loginDto);
  }

  @Post('registration')
  public async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    return await this.authService.registration(registrationDto);
  }
}
