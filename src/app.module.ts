import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

// This file configures modules, controller and services
@Module({
  imports: [
    TypeOrmModule.forRoot({ // db config
      type: 'sqlite', // db type
      database: 'generalDb.db', // db fileName
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entities path
      synchronize: true, // automatic sync
    }),
    UsersModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
