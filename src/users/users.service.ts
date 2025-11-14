import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
  // Check if username already exists
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hashes password for security
    const saltRounds = Number(this.configService.get('BCRYPT_SALT_ROUNDS')) || 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Replaces user's password with the hashed one before saving it
    const user = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Remove password before returning
    const { password, ...result } = savedUser;
    return result;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
    const existing = await this.userRepository.findOne({
      where: { username: updateUserDto.username },
    });

    if (existing && existing.id !== id) {
      throw new ConflictException('Username already exists');
    }
  }

    // hashes password
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hashedPassword;
    }

    Object.assign(user, updateUserDto);
    const { password, ...result } = user;
    return this.userRepository.save(result);
  }


  
  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> {
  return await this.userRepository.findOne({
    where: { username },
    select: ['id', 'username', 'password'], // password is hidden by default, it is explicitly given for login.
  });
}
}