import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createSocketConnection } from './websocket/socketConnection.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const server = await app.listen(3000);
  createSocketConnection(server);
}
bootstrap();
