import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getList(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {
        collections: true,
      },
    });
  }

  public async getUserByName(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  public async addUser(user: CreateUserDto): Promise<User> {
    const { username, email, password } = user;
    const newUser = {
      username,
      email,
      password,
      createDate: Date.now().toString(),
    };
    return await this.usersRepository.save(newUser);
  }

  public async changeUsersBlockStatus({
    ids,
    isBlocked,
  }: {
    ids: string;
    isBlocked: boolean;
  }): Promise<void> {
    const idsArr = ids.split(',');
    const promiseArr = idsArr.map((id) => {
      return this.usersRepository.update(id, { isBlocked });
    });
    await Promise.all(promiseArr);
    return;
  }

  public async changeUsersAdminStatus({
    ids,
    isAdmin,
  }: {
    ids: string;
    isAdmin: boolean;
  }): Promise<void> {
    const idsArr = ids.split(',');
    const promiseArr = idsArr.map((id) => {
      return this.usersRepository.update(id, { isAdmin });
    });
    await Promise.all(promiseArr);
    return;
  }

  public async updateUserLoginDate(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLoginDate: Date.now().toString(),
    });
    return;
  }

  public async deleteUser(ids: string): Promise<void> {
    const idsArr = ids.split(',');
    const promiseArr = idsArr.map((id) => {
      return this.usersRepository.delete(id);
    });
    await Promise.all(promiseArr);
    return;
  }
}
