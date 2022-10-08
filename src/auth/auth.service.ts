import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';
import { RegistrationDto } from './dto/registration.dto';
import { AuthResponse } from './models/login-response.model';
import { RegistrationResponse } from './models/registration-response.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  public async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    registrationDto.password = await bcrypt.hash(
      registrationDto.password,
      +process.env.PASSWORD_SALT_OR_ROUNDS,
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

  public async login(loginDto: LoginDto): Promise<AuthResponse> {
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
    const tokenObject = this.getToken(user);
    const { username, id, role } = user;
    return { username, userId: id, role, ...tokenObject };
  }

  private getToken(user: User): { accessToken: string } {
    const payload = {
      username: user.username,
      role: user.role,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      }),
    };
  }
}
