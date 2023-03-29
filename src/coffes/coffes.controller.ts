import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('coffees')
export class CoffesController {
  @Get('flavours')
  findAll(@Res() response) {
    response.status(200).send({
      response: 'okok',
    });
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
