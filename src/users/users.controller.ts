import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './user.entity';
import { UsersService } from './services/users.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookie-auth.guard';

@Controller('v1/users')
@UseGuards(CookieAuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @HttpCode(200)
  public getList(): Promise<User[]> {
    return this.usersService.getList();
  }

  @Post('add-user')
  @Roles(Role.Admin)
  @HttpCode(201)
  public async addUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.addUser(user);
  }

  @Put('set-block-status')
  @Roles(Role.Admin)
  @HttpCode(200)
  public async blockUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.blockUsers(body.ids);
  }

  @Put('remove-block-status')
  @Roles(Role.Admin)
  @HttpCode(200)
  public async unblockUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.unblockUsers(body.ids);
  }

  @Put('set-admin-status')
  @Roles(Role.Admin)
  @HttpCode(200)
  public async setAdminUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.setAdminUsers(body.ids);
  }

  @Put('remove-admin-status')
  @Roles(Role.Admin)
  @HttpCode(200)
  public async removeAdminUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.removeAdminUsers(body.ids);
  }

  @Delete('delete')
  @Roles(Role.Admin)
  @HttpCode(204)
  public async deleteUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.deleteUser(body.ids);
  }
}
