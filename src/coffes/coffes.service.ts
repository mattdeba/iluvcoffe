import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findOne(id: string) {
    const coffee = await this.coffeRepository.findOne({
      where: { id: +id },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async findAll() {
    return this.coffeRepository.find({
      relations: {
        flavors: true,
      },
    });
  }

  async create(createCoffeeDto: CreateCoffeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeRepository.create({
      ...createCoffeeDto,
      flavors, //destructuring
    });
    return this.coffeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = await this.coffeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`coffee ${id} not found`);
    }
    return this.coffeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
