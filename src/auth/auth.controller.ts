import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationResponse } from './models/registration-response.model';
import { Request } from 'express';
import { CookieAuthenticationGuard } from './guards/cookie-auth.guard';
import { LogInWithCredentialsGuard } from './guards/login-with-credentials.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LogInWithCredentialsGuard)
  @Post('login')
  public async login(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  @UseGuards(CookieAuthenticationGuard)
  async logOut(@Req() request: Request) {
    request.session.cookie.maxAge = 0;
    request.session.destroy((e) => {
      if (e) {
        console.log(e);
      }
    });
  }

  @Post('registration')
  public async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    return await this.authService.registration(registrationDto);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get('check-auth')
  async checkAuth(@Req() request: Request) {
    return request.user;
  }
}
