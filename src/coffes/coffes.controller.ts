import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffesService } from './coffes.service';

@Controller('coffees')
export class CoffesController {
  constructor(private readonly coffeService: CoffesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.coffeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeService.findOne(id);
  }

  @Post()
  //@HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return this.coffeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeService.remove(id);
  }
}
