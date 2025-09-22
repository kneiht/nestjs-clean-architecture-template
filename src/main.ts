import { NestFactory } from '@nestjs/core';
import { AppModule } from './adapters/nestjs/app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from '@/config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(env.PORT ?? 3000);
}
bootstrap();
