import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ChatHistory } from './ChatHistory';
import { Chat } from './Chat';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  role!: string;

  @Column({ unique: true })
  providerId!: string; // Unique ID from the social provider (Google, GitHub, Facebook, etc.)

  @Column()
  provider!: string; // Name of the provider (e.g., 'google', 'github', 'facebook')

  @Column()
  picture!: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin!: Date | null;

  @Column({ default: 'active' })
  status!: 'active' | 'inactive';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.user)
  chatHistories!: ChatHistory[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats!: Chat[];
}
