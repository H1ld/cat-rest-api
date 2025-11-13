import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipeline configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // needed to use forbidNonWhitelisted
      forbidNonWhitelisted: true, // throws an error if extra data are sent
      transform: true, // instantly turn request into DTO instances necessary to apply conditions checks (password)
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Cats REST API')
    .setDescription('3rd school year project')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', 
    )
    .addTag('Users')
    .addTag('Cats')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
