import { NestFactory } from '@nestjs/core';
import { AppModule } from './adapters/nestjs/app.module';
import { UseCaseResponseInterceptor } from './adapters/nestjs/interceptors/response.interceptor';

import { env } from '@/config/environment';
import { connectDb } from '@/config/database';

async function bootstrap() {
  await connectDb();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new UseCaseResponseInterceptor());
  await app.listen(env.PORT ?? 3000);
}
void bootstrap();
