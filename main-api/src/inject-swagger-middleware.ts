import { writeFileSync } from 'fs';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { register } from 'prom-client';

function sortByKey<T>(obj: T | undefined, key: string): void {
  if (obj) {
    const value = obj[key as keyof T] as unknown as
      | Record<string, unknown>
      | undefined;
    if (Array.isArray(value)) {
      value.sort();
    } else if (value) {
      obj[key as keyof T] = Object.keys(value)
        .sort()
        .reduce(
          (obj, key) => {
            obj[key] = value[key];
            return obj;
          },
          {} as typeof value,
        ) as unknown as NonNullable<T>[Extract<keyof T, string>];
    }
  }
}

export default function injectSwaggerMiddleware(
  nestApp: INestApplication,
): void {
  const isLocal =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  if (!isLocal) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('backend API')
    .setDescription('backend API description')
    .setVersion('1.0')
    .addTag('backend')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'jwt',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(nestApp, config);

  sortByKey(document.components, 'schemas');
  if (document.components?.schemas) {
    const schemas = document.components.schemas;
    Object.keys(schemas).forEach((key) => {
      sortByKey(schemas[key], 'properties');
      sortByKey(schemas[key], 'required');
    });
  }
  sortByKey(document, 'paths');

  SwaggerModule.setup('api', nestApp, document);
  writeFileSync('swagger.yml', dump(document, {}));

  register.clear();
}
