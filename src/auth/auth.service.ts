import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationResponse } from './models/registration-response.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    registrationDto.password = await bcrypt.hash(
      registrationDto.password,
      // +process.env.PASSWORD_SALT_OR_ROUNDS,
      +this.configService.get('PASSWORD_SALT_OR_ROUNDS'),
    );
    try {
      const user = await this.usersRepositoryService.addUser(registrationDto);
      const { username, email } = user;
      return { username, email };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('username or email is already exist');
      }
    }
  }

  public async login(loginDto: LoginDto): Promise<{
    username: string;
    userId: string;
    role: string;
    cookieWithJwt: string;
  }> {
    const user = await this.usersRepositoryService.getUserByName(
      loginDto.username,
    );
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    const isPasswordsMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordsMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const cookieWithJwt = this.getCookieWithJwtToken(user);
    const { username, id, role } = user;
    return { username, userId: id, role, cookieWithJwt };
  }

  private getCookieWithJwtToken(user: User): string {
    const payload = {
      username: user.username,
      role: user.role,
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return `Authorization=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${this.configService.get(
      'ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authorization=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
  }
}
