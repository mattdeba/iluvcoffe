import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';

@Module({
  controllers: [CoffesController],
  providers: [CoffesService],
  exports: [CoffesService],
})
export class CoffesModule {}
