import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
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
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  public async getList(): Promise<User[]> {
    return await this.usersService.getList();
  }

  @Get('one-by-name/:name')
  @HttpCode(200)
  public async getOneByName(@Param('name') name: string): Promise<User> {
    const result = await this.usersService.getUserByName(name);
    if (!result) throw new NotFoundException();
    if (result.isBlocked) throw new ForbiddenException();
    return result;
  }

  @Post('add-user')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  public async addUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.addUser(user);
  }

  @Put('set-block-status')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  public async blockUsers(@Body() body: { ids: string[] }): Promise<void> {
    return await this.usersService.blockUsers(body.ids);
  }

  @Put('remove-block-status')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  public async unblockUsers(@Body() body: { ids: string[] }): Promise<void> {
    return await this.usersService.unblockUsers(body.ids);
  }

  @Put('set-admin-status')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  public async setAdminUsers(@Body() body: { ids: string[] }): Promise<void> {
    return await this.usersService.setAdminUsers(body.ids);
  }

  @Put('remove-admin-status')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  public async removeAdminUsers(
    @Body() body: { ids: string[] },
  ): Promise<void> {
    return await this.usersService.removeAdminUsers(body.ids);
  }

  @Delete('remove-users')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204)
  public async deleteUsers(@Body() body: { ids: string[] }): Promise<void> {
    return await this.usersService.deleteUser(body.ids);
  }
}
