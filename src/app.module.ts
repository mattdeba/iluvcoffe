import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesController } from './coffes/coffes.controller';
import { CoffesService } from './coffes/coffes.service';

@Module({
  imports: [],
  controllers: [AppController, CoffesController],
  providers: [AppService, CoffesService],
})
export class AppModule {}
