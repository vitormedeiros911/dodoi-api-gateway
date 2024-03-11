import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    maxAge: 3600,
    allowedHeaders: ['token', 'content-type'],
    exposedHeaders: ['Content-Disposition'],
  });

  await app.listen(3000);
}
bootstrap();
