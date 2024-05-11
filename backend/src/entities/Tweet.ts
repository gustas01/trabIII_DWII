import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tweets, { onDelete: "CASCADE" })
  author: User;
}
