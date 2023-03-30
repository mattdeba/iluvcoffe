import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesModule } from './coffes/coffes.module';

@Module({
  imports: [CoffesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
