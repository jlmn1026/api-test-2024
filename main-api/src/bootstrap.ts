import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { collectDefaultMetrics } from 'prom-client';

import { AppModule } from './app.module';
import injectSwaggerMiddleware from './inject-swagger-middleware';

export async function bootstrapNest(): Promise<void> {
  const nestApp = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    injectSwaggerMiddleware(nestApp);
    collectDefaultMetrics();
  }

  const allowedOrigins = [process.env.ALLOWED_ORIGINS];

  nestApp.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  nestApp.enableShutdownHooks();
  nestApp.use(json({ limit: '15mb' }));

  await nestApp.init();
  await nestApp.listen(3000);
}
