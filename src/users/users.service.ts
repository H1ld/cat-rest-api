import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { hash } from 'crypto';

// User service file, 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Hashes password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Replaces user's password with the hashed one before saving it
    const user = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });

    // Saves user in database
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  const toUpdate = await this.userRepository.findOne({ where: { id } });

  // Checks if user exists
  if (!toUpdate) {
    throw new Error(`User with ID ${id} not found`);
  }

  const updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}