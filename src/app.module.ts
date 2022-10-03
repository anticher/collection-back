import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { Collection } from './collections/collection.entity';
import { CollectionItemsModule } from './items/collection-items.module';
import { Item } from './items/item.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tag.entity';
import { ThemesModule } from './themes/themes.module';
import { Theme } from './themes/theme.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Collection, Item, Comment, Tag, Theme, User],
      synchronize: true,
    }),
    UsersModule,
    CollectionsModule,
    CollectionItemsModule,
    CommentsModule,
    TagsModule,
    ThemesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
