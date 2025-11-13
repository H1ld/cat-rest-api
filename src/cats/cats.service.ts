import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { User } from '../users/entities/user.entity';
import fetch from 'node-fetch';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCatDto: CreateCatDto, ownerPayload: any) {
    // Load the actual user entity from DB (it glitches out with the token, couldn't really figure out why)
    const owner = await this.userRepository.findOne({
      where: { id: ownerPayload.sub },
    });
    if (!owner) {
      throw new Error('User not found');
    }

    let imageUrl: string | null = null;
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = (await response.json()) as Array<{ url: string }>;
      imageUrl = data[0]?.url || null;
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }

    
    const cat = this.catRepository.create({
      ...createCatDto,
      owner,
      imageUrl,
    });

    return await this.catRepository.save(cat);
  }

  async findAll(ownerPayload: any) {
    return await this.catRepository.find({
      where: { owner: { id: ownerPayload.sub } },
      relations: ['owner'], // eager load owner
    });
  }

  async findOne(id: number, ownerPayload: any) {
    return await this.catRepository.findOne({
      where: { id, owner: { id: ownerPayload.sub } },
      relations: ['owner'],
    });
  }

  async update(id: number, updateCatDto: UpdateCatDto, ownerPayload: any) {
    const cat = await this.findOne(id, ownerPayload);
    if (!cat) throw new Error(`Cat not found or not yours`);
    Object.assign(cat, updateCatDto);
    return await this.catRepository.save(cat);
  }

  async remove(id: number, ownerPayload: any) {
    const cat = await this.findOne(id, ownerPayload);
    if (!cat) throw new Error(`Cat not found or not yours`);
    return await this.catRepository.remove(cat);
  }
}
