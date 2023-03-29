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

@Controller('coffees')
export class CoffesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return {
      limit,
      offset,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return {
      response: `${id}`,
    };
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `update the object with the id ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action remove id ${id} coffee`;
  }
}
