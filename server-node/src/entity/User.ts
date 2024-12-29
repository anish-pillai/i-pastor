import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  login!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  role!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "'2024-12-28 00:00:00'",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => "'2024-12-28 00:00:00'",
  })
  updatedAt!: Date;
}
