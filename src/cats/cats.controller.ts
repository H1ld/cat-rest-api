import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

// This file links the requests with the code they execute
@Controller('cats') // Defines endpoint
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post() // If html POST request, execute
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() { // If html GET request, execute
    return this.catsService.findAll();
  }

  @Get(':id') // If html get request with an id, execute
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id') // If html PUT request, execute
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id') // If html DELETE request, execute
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
