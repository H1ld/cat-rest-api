import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// Ce fichier définit le module principal de l'application.
// Il configure les modules, les contrôleurs et les services.
@Module({
  imports: [
    TypeOrmModule.forRoot({ // Configuration de la connexion à la base de données SQLite
      type: 'sqlite', // Type de base de données
      database: 'todoapp.db', // Nom du fichier de base de données
      entities: [__dirname + '/**/*.entity.ts'], // Chemin vers les entités
      synchronize: true, // Synchronisation automatique des entités avec la base de données, utile en développement mais à éviter en production
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
