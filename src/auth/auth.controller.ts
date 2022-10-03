import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string } | string> {
    return await this.authService.login(loginDto);
  }
}
