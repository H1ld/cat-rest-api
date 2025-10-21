import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Cat } from './entities/cat.entity'
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

// Defines which files to use for Cat module
@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}