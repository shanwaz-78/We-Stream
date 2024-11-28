import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createSocketConnection } from './websocket/socketConnection.js';
import { ExpressAdapter } from '@nestjs/platform-express';

import * as express from 'express';

const expressServer = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressServer),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const httpServer = await app.listen(3000);
  createSocketConnection(httpServer);
}

bootstrap();
