import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffe.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
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

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset, // 👈
      take: limit, // 👈
    });
  }

  async create(createCoffeeDto: CreateCoffeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors, //destructuring
    });
    return this.coffeeRepository.save(coffee);
  }

  async createWithTransaction(createCoffeeDto: CreateCoffeDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const flavors = await Promise.all(
        createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      );
      const coffee1 = this.coffeeRepository.create({
        ...createCoffeeDto,
        name: 'coffee1',
        flavors, //destructuring
      });
      const coffee2 = this.coffeeRepository.create({
        ...createCoffeeDto,
        name: 'coffee2',
        flavors, //destructuring
      });
      const coffeeRepository = queryRunner.manager.getRepository(Coffee);
      await Promise.all([
        queryRunner.manager.save(coffee1),
        queryRunner.manager.save(coffee2),
        new Promise((res, rej) => rej('error')),
      ]);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      const res = await queryRunner.rollbackTransaction();
      console.log(res);
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`coffee ${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
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
