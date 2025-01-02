import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat!: Chat;

  @Column()
  prompt!: string;

  @Column({ nullable: true })
  response?: string;

  @Column({ type: 'int', default: 0 })
  totalTokens!: number;

  @Column({ type: 'numeric', default: 0 })
  totalCost!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
