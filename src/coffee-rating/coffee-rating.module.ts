import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffesModule } from '../coffes/coffes.module';
import { CoffesService } from '../coffes/coffes.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
    }), // Importation du module dynamique en lui passant les paramètres de connexion
    CoffesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
