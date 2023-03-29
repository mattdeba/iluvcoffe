import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Coffee } from './entities/coffe.entity';
import * as _ from 'lodash';

@Injectable()
export class CoffesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      brand: 'senseo',
      name: 'classique',
      flavors: ['standard', 'vanille'],
    },
  ];

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  findAll() {
    return this.coffees;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const existingCoffeeIndex = this.coffees.findIndex(
        (item) => item.id === +existingCoffee.id,
      );
      this.coffees[existingCoffeeIndex] = {
        id: existingCoffee.id,
        ..._.omit(updateCoffeeDto, 'id'),
      };
    }
  }

  remove(id: string) {
    const coffeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeIndex >= 0) {
      this.coffees.splice(coffeIndex, 1);
    }
  }
}
