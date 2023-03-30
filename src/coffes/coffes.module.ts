import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
