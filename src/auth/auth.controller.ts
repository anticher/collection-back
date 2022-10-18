import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponse } from './models/login-response.model';
import { RegistrationResponse } from './models/registration-response.model';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    delete result.cookieWithJwt;
    return response.send(result);
  }

  @Post('logout')
  async logOut(@Res() response: Response) {
    const newCookie = this.authService.getCookieForLogOut();
    response.setHeader('Set-Cookie', newCookie);
    return response.sendStatus(200);
  }

  @Post('registration')
  public async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    return await this.authService.registration(registrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  async checkAuth(@Req() request: Request) {
    console.log(request.user);
    // console.log('ggg');
    // console.log(request.headers);
    return request.user;
  }
}
