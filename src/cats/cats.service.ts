import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity' 

// Cat service file, contains operators 
@Injectable()
export class CatsService { 
  constructor( 
    @InjectRepository(Cat) 
    private catRepository: Repository<Cat>, 
  ) {} 

  async create(createCatDto: CreateCatDto) { //Creates Cat according to its dto 
    return await this.catRepository.save(createCatDto); 
  }

  async findAll() { // Returns all cats 
    return await this.catRepository.find(); 
  } 

  async findOne(id: number) { // Return cat with given id 
    return await this.catRepository.findOne({ where: { id } }); 
  } 

  async update(id: number, updateCatDto: UpdateCatDto) { // Updates cat according to its dto 
  const toUpdate = await this.catRepository.findOne({ where: { id } });

  if (!toUpdate) { // Makes sure update is on an existing user 
    throw new Error(`Cat with ID ${id} not found`); 
  }

  const updated = Object.assign(toUpdate, updateCatDto); 
    return await this.catRepository.save(updated); 
  }

  async remove(id: number) { // Deletes cat
    return await this.catRepository.delete(id); 
  } 
}