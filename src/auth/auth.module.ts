import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
