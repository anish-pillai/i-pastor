import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class ChatHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.chatHistories, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Chat, (chat) => chat.chatHistory)
  chats!: Chat[];

  @Column({ default: false })
  deleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
