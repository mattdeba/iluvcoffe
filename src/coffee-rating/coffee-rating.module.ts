import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffesModule } from '../coffes/coffes.module';
import { CoffesService } from '../coffes/coffes.service';

@Module({
  imports: [CoffesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
