import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto, @Request() req) {
    return this.catsService.create(createCatDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.catsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.catsService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @Request() req) {
    return this.catsService.update(+id, updateCatDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.catsService.remove(+id, req.user);
  }
}
