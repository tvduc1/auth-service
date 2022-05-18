import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvKeys } from './constants/env-keys.constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get(EnvKeys.BACKEND_PORT);
  await app.listen(port);
}
bootstrap();
