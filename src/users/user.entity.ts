import { Item } from 'src/items/entities/item.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Comment } from 'src/comments/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from 'src/auth/role.enum';
import { Like } from 'src/likes/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @OneToMany(() => Like, (like) => like.item)
  likes: Like[];

  @OneToMany(() => Collection, (collection) => collection.owner)
  collections: Collection[];

  @OneToMany(() => Item, (item) => item.owner)
  items: Item[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
