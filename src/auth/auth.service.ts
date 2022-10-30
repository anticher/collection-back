import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationResponse } from './models/registration-response.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly configService: ConfigService,
  ) {}

  public async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    registrationDto.password = await bcrypt.hash(
      registrationDto.password,
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

  public async getAuthenticatedUser(loginDto: LoginDto) {
    const user = await this.usersRepositoryService.getUserByName(
      loginDto.username,
    );
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    if (user.isBlocked) {
      throw new ForbiddenException('User is blocked');
    }
    const isPasswordsMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordsMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const { username, id, role } = user;
    return { username, id, role };
  }
}
