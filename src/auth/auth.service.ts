import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string } | string> {
    const user = await this.usersRepositoryService.getUserByName(
      loginDto.username,
    );
    console.log(user);
    console.log(loginDto);
    if (typeof user === 'string' || user.password !== loginDto.password) {
      throw new BadRequestException();
    }
    return this.getToken(user);
  }

  private getToken(user: User): { accessToken: string } {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      }),
    };
  }
}
