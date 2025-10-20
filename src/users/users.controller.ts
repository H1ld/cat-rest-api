import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// This file links the requests with the code they execute
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // If html POST request, execute
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() { // If html GET request, execute
    return this.usersService.findAll();
  }

  @Get(':id') // If html get request with an id, execute
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // If html PUT request, execute
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // If html DELETE request, execute
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
