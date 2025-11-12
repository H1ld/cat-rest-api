import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  color: string;

  // Allows multiple cats to be owned by a single user.
  @ManyToOne(() => User, (user) => user.cats, { onDelete: 'CASCADE' })
  owner: User;
}
