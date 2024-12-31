import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from './Chat';
import { User } from './User';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  prompt!: string;

  @Column({ type: 'text', nullable: true })
  response!: string;

  @Column({ type: 'numeric', nullable: true })
  totalCost!: number;

  @Column({ type: 'int', nullable: true })
  totalTokens!: number;

  @Column({ default: false })
  isRead!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chatId' })
  chat!: Chat;

  @Column()
  chatId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: string;
}
