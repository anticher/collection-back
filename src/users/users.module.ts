import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UsersRepositoryService } from './services/users-repository.service';
import { User } from './user.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService],
  exports: [UsersRepositoryService],
})
export class UsersModule {}
