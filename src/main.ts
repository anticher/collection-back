import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: process.env.FRONT });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    url: `redis://${configService.get('REDIS_LOGIN')}:${configService.get(
      'REDIS_PASSWORD',
    )}@${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}/0`,
    legacyMode: true,
  });
  // const redisClient = createClient({
  //   url: `redis://localhost:6379`,
  //   legacyMode: true,
  // });

  // (async () => {
  //   await redisClient.connect();
  // })();

  redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
  });
  redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
  });
  redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient as any }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
