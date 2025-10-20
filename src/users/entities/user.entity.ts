import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Defines variables type
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text')
  email: string;
}