import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// User service file, 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) { //Creates user according to its dto
    return await this.userRepository.save(createUserDto);
  }

  async findAll() { // Returns all users
    return await this.userRepository.find();
  }

  async findOne(id: number) { // Return user with given id
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) { // Updates User according to its dto
  const toUpdate = await this.userRepository.findOne({ where: { id } });

  if (!toUpdate) { // Makes sure update is on an existing user
    throw new Error(`User with ID ${id} not found`);
  }

  const updated = Object.assign(toUpdate, updateUserDto);
  return await this.userRepository.save(updated);
  }

  async remove(id: number) { // Deletes user
    return await this.userRepository.delete(id);
  }
}