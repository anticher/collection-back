import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  public async registration(registrationDto: RegistrationDto): Promise<User> {
    registrationDto.password = await bcrypt.hash(
      registrationDto.password,
      +process.env.PASSWORD_SALT_OR_ROUNDS,
    );
    const user = await this.usersRepositoryService.addUser(registrationDto);
    return user;
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string } | string> {
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
    return this.getToken(user);
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
