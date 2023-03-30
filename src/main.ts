import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //permet de filtrer les body des requêtes en ne prenant que les valeurs définies dans le dto.
      forbidNonWhitelisted: true, // n'autorise pas les champs non définis
    }),
  );
  await app.listen(3000);
}
bootstrap();
