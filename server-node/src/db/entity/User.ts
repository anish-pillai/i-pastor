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
}
