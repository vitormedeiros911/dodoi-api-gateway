import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    maxAge: 3600,
    allowedHeaders: ['token', 'content-type'],
    exposedHeaders: ['Content-Disposition'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Dodoi API Gateway')
    .addSecurity('token', { name: 'token', in: 'header', type: 'apiKey' })
    .build();

  const documento = SwaggerModule.createDocument(app, config);

  await writeFile('swagger.json', JSON.stringify(documento));

  const configService = app.get<ConfigService>(ConfigService);
  const porta = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  if (env === 'development') SwaggerModule.setup('/docs', app, documento);

  await app.listen(porta);
}

bootstrap();
