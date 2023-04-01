import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesModule } from './coffes/coffes.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [CoffesModule, CoffeeRatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
