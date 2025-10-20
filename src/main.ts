import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// Main file to run
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Creates the app
  await app.listen(process.env.PORT ?? 3000); // Sets listening port
}
bootstrap();
