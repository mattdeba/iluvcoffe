import { Injectable, Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { COFFEE_BRANDS } from './coffees.constants';

@Injectable()
class myProvider {
  constructor(public myString: string = 'hello') {}
}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  controllers: [CoffesController],
  providers: [
    CoffesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: string): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('async factory');
        return coffeeBrands;
      },
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
