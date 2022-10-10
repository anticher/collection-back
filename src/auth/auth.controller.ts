import { Body, Controller, Post, Res } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponse } from './models/login-response.model';
import { RegistrationResponse } from './models/registration-response.model';
import { Response } from 'express';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response,
  ): Promise<Response<AuthResponse>> {
    const result = await this.authService.login(loginDto);
    response.setHeader('Set-Cookie', result.cookieWithJwt);
    return response.send(result);
  }

  @Post('registration')
  public async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    return await this.authService.registration(registrationDto);
  }
}
