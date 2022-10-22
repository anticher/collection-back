import { Collection } from 'src/collections/entities/collection.entity';
import { CustomFieldValue } from 'src/items/entities/custom-field-value.entity';
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
  tagNames: Tag[];

  @Column({ default: null })
  image: string | null;

  @ManyToOne(() => Collection, (collection) => collection.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collection: Collection;
  @Column()
  collectionId: string;

  @OneToMany(
    () => CustomFieldValue,
    (customFieldValue) => customFieldValue.item,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  customFieldValues: CustomFieldValue[];

  @Column({ default: null })
  likes: string | null;

  @ManyToOne(() => User, (user) => user.username)
  owner: User;
  @Column()
  ownerName: string;

  @OneToMany(() => Comment, (comment) => comment.item)
  comments: Comment[];

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
