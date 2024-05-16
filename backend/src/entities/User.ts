import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './Tweet';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 30 })
  firstName: string;

  @Column({ nullable: false, length: 30 })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.author)
  tweets: Tweet[];
}
