import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';

@Module({
  controllers: [CoffesController],
  providers: [
    CoffesService,
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['buddy brew', 'nescafe'],
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
