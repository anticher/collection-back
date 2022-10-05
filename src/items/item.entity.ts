import { Collection } from 'src/collections/collection.entity';
import { Comment } from 'src/comments/comment.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Tag, (tag) => tag.collectionItems)
  @JoinTable({
    name: 'item_tag',
  })
  tags: Tag[];

  @ManyToOne(() => Collection, (collection) => collection.id)
  collection: Collection;
  @Column()
  collectionId: string;

  @Column({ default: null })
  likes: string | null;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
  @Column()
  ownerId: string;

  @OneToMany(() => Comment, (comment) => comment.item)
  comments: Comment[];

  @Column()
  creatorId: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
