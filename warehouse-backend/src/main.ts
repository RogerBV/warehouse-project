import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false
  })

  // Configurar servidor de archivos estáticos para imágenes
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });

  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addBearerAuth() // opcional, si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  await app.listen(3000);
}
bootstrap();
