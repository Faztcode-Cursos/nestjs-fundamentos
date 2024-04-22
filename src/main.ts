import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Permite aplicar validaciones a los datos que se reciben(dtos) en todos los controladores de la aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      //* Permite que se envíen solo los campos que están definidos en el DTO no campos adicionales
      whitelist: true,
    }),
  );

  //* Configuración de Swagger para la documentación de la API.
  //* setTitle(): Título de la documentación.
  //* setDescription(): Descripción de la documentación.
  //* setVersion(): Versión de la documentación.
  //* addTag(): Agrega una etiqueta a la documentación.
  //* build(): Construye la documentación.
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  //* Crea la documentación de la API. SwaggerModule.createDocument(app, config) recibe la aplicación
  //* y la configuración de la documentación.
  const document = SwaggerModule.createDocument(app, config);
  //* SwaggerModule.setup('api', app, document) permite visualizar la documentación de la API en la ruta /api.
  SwaggerModule.setup('api', app, document);

  //* 'origin' permite que solo se habiliten las solicitudes de origen especificado.
  /* app.enableCors({
    origin: 'https://docs.nestjs.com',
  }); */
  //* Habilita CORS para que la API pueda ser consumida por cualquier origen(cualquier cliente).
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
