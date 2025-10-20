import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// This file configures modules, controller and services
@Module({
  imports: [
    TypeOrmModule.forRoot({ // db config
      type: 'sqlite', // db type
      database: 'todoapp.db', // db fileName
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entities path
      synchronize: true, // automatic sync
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
