import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  lastLoginDate: string | null;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: false })
  isAdmin: boolean;
}
