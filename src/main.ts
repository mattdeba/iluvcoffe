import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); //Permet d'utiliser le filtre d'exception
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //permet de filtrer les body des requêtes en ne prenant que les valeurs définies dans le dto.
      forbidNonWhitelisted: true, // n'autorise pas les champs non définis
      //transform: true, //transforme la payload en une instance de l'objet correspondant
      //exemple permet de convertir une string issue de la query comme l'id en number.
    }),
  );
  app.useGlobalGuards(new ApiKeyGuard());
  await app.listen(3000);
}
bootstrap();
