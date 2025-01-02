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
  chatId!: string; // Add this line to ensure chatId gets populated

  @Column()
  prompt!: string;

  @Column({ nullable: true })
  response?: string;

  @Column({ type: 'int', default: 0 })
  totalTokens!: number;

  @Column({ type: 'numeric', precision: 10, scale: 4, default: 0 }) // Adjust precision and scale as needed
  totalCost!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
