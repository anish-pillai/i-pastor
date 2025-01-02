import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ChatHistory } from './ChatHistory';
import { Message } from './Message';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ChatHistory, (chatHistory) => chatHistory.chats, {
    onDelete: 'CASCADE',
  })
  chatHistory!: ChatHistory;

  @Column()
  topic!: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
