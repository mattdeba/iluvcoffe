import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';

class MockCoffeeService {}

@Module({
  controllers: [CoffesController],
  providers: [
    {
      provide: CoffesService,
      useValue: new MockCoffeeService(),
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
