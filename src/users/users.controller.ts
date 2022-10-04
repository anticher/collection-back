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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Actions } from 'src/casl/actions.enum';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { AbilitiesGuard } from 'src/casl/abilities.guard';

@Controller('v1/users')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(200)
  public getList(): Promise<User[]> {
    return this.usersService.getList();
  }

  @Post('add-user')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(201)
  public async addUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.addUser(user);
  }

  @Put('set-block-status')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(200)
  public async blockUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.blockUsers(body.ids);
  }

  @Put('remove-block-status')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(200)
  public async unblockUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.unblockUsers(body.ids);
  }

  @Put('set-admin-status')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(200)
  public async setAdminUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.setAdminUsers(body.ids);
  }

  @Put('remove-admin-status')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(200)
  public async removeAdminUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.removeAdminUsers(body.ids);
  }

  @Delete('delete')
  @CheckAbilities({ action: Actions.Manage, subject: User })
  @HttpCode(204)
  public async deleteUsers(@Body() body: { ids: string }): Promise<void> {
    return await this.usersService.deleteUser(body.ids);
  }
}
