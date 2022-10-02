import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.dto';
import { User } from '../user.entity';
import { UsersRepositoryService } from './users-repository.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  public async getList(): Promise<User[]> {
    return await this.usersRepositoryService.getList();
  }

  public async getUserByName(name: string): Promise<User> {
    return await this.usersRepositoryService.getUserByName(name);
  }

  public async addUser(user: CreateUserDto): Promise<User> {
    return await this.usersRepositoryService.addUser(user);
  }

  public async blockUsers(ids: string): Promise<void> {
    return await this.usersRepositoryService.changeUsersBlockStatus({
      ids,
      isBlocked: true,
    });
  }

  public async unblockUsers(ids: string): Promise<void> {
    return await this.usersRepositoryService.changeUsersBlockStatus({
      ids,
      isBlocked: false,
    });
  }

  public async setAdminUsers(ids: string): Promise<void> {
    return await this.usersRepositoryService.changeUsersAdminStatus({
      ids,
      isAdmin: true,
    });
  }

  public async removeAdminUsers(ids: string): Promise<void> {
    return await this.usersRepositoryService.changeUsersAdminStatus({
      ids,
      isAdmin: false,
    });
  }

  public async updateUserLoginDate(id: string): Promise<void> {
    return await this.usersRepositoryService.updateUserLoginDate(id);
  }

  public async deleteUser(ids: string): Promise<void> {
    return await this.usersRepositoryService.deleteUser(ids);
  }
}
