import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersRepositoryService } from 'src/users/services/users-repository.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersRepositoryService: UsersRepositoryService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersRepositoryService.getUserById(userId);
    if (user.isBlocked) done(null, false);
    done(null, user);
  }
}
