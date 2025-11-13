import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {unique: true}) // Prevents duplicates username
  username: string;

  @Column('text', { select: false }) // Hide password in Curl requests
  password: string;

  // Allows user to have multiple cats.
  @OneToMany(() => Cat, (cat) => cat.owner)
  cats: Cat[];
}
