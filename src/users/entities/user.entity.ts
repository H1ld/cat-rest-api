import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Defines variables type
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;
}