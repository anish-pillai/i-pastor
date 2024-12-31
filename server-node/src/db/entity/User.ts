import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Chat } from './Chat';
import { ChatHistory } from './ChatHistory';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  login!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin!: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats!: Chat[];

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.user)
  chatHistories!: ChatHistory[];
}
