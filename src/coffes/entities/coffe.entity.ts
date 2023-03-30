import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity('coffee')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  //what is coffee inside the flavor entity ?
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees)
  flavors: string[];

  //@Column('json', { nullable: true })
  //flavors: string[];
}
