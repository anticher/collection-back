import { Collection } from 'src/collections/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Collection, (collection) => collection.owner)
  collections: Collection[];
}