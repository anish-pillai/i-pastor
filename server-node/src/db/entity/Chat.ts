import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { ChatHistory } from './ChatHistory';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.chat)
  chatHistories!: ChatHistory[];

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Message, (message) => message.chat)
  @JoinColumn({ name: 'id' }) // Ensure the join column is correctly set
  messages!: Message[];

  @ManyToOne(() => ChatHistory, { nullable: true })
  @JoinColumn({ name: 'chatHistoryId' })
  chatHistory?: ChatHistory;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
