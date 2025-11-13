import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


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
  return await this.userRepository.findOne({
    where: { username },
    select: ['id', 'username', 'password'], // password is hidden by default, it is explicitly given for login.
  });
}
}