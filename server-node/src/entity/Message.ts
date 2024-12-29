import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  prompt!: string;

  @Column('text')
  response!: string;

  @Column('float', { default: 0 })
  totalCost!: number;

  @Column('int', { default: 0 })
  totalTokens!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'chatId' })
  chat!: Chat;

  @Column()
  chatId!: number;
}
